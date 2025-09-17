import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('í¼± Starting database seed...')
  
  // Clear existing data
  await prisma.comparison.deleteMany()
  await prisma.vendorPrice.deleteMany() 
  await prisma.phone.deleteMany()
  await prisma.vendor.deleteMany()
  await prisma.brand.deleteMany()

  // Create brands
  console.log('í³± Creating brands...')
  const brands = await Promise.all([
    prisma.brand.create({ data: { name: 'Samsung', slug: 'samsung' } }),
    prisma.brand.create({ data: { name: 'Apple', slug: 'apple' } }),
    prisma.brand.create({ data: { name: 'Google', slug: 'google' } }),
    prisma.brand.create({ data: { name: 'OnePlus', slug: 'oneplus' } }),
    prisma.brand.create({ data: { name: 'Xiaomi', slug: 'xiaomi' } }),
    prisma.brand.create({ data: { name: 'Vivo', slug: 'vivo' } })
  ])

  // Create vendors
  console.log('í¿ª Creating vendors...')
  const vendors = await Promise.all([
    prisma.vendor.create({ data: { name: 'Daraz', slug: 'daraz' } }),
    prisma.vendor.create({ data: { name: 'PriceOye', slug: 'priceoye' } }),
    prisma.vendor.create({ data: { name: 'Whatmobile', slug: 'whatmobile' } })
  ])

  // Create phones
  console.log('í³± Creating phones...')
  const phones = []
  for (let i = 0; i < 20; i++) {
    const brand = brands[i % brands.length]
    const phone = await prisma.phone.create({
      data: {
        name: `${brand.name} Phone ${i + 1}`,
        slug: `${brand.slug}-phone-${i + 1}`,
        brandId: brand.id,
        ramGB: [4, 6, 8, 12][Math.floor(Math.random() * 4)],
        storageGB: [64, 128, 256, 512][Math.floor(Math.random() * 4)],
        fiveG: Math.random() > 0.3,
        batteryMAh: 3000 + Math.floor(Math.random() * 3000),
        displayInch: 5.5 + Math.random() * 2,
        releaseYear: 2022 + Math.floor(Math.random() * 3),
        ptaApproved: Math.random() > 0.2
      }
    })
    phones.push(phone)
  }

  // Create prices
  console.log('í²° Creating prices...')
  for (const phone of phones) {
    for (const vendor of vendors) {
      const price = 50000 + Math.floor(Math.random() * 300000)
      await prisma.vendorPrice.create({
        data: {
          phoneId: phone.id,
          vendorId: vendor.id,
          pricePKR: price
        }
      })
    }
  }

  console.log('âœ… Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('âŒ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
