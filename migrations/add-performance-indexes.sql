-- Migration to add performance indexes for phone filtering
-- Run with: npx prisma db push

-- The following indexes are already defined in schema.prisma and will be created:
-- Phone table indexes:
-- - brandId (existing)
-- - ramGB (existing) 
-- - storageGB (new)
-- - fiveG (existing)
-- - batteryMAh (new)
-- - releaseYear (new)
-- - ptaApproved (new)
-- - displayInch (new)
-- - ramGB + storageGB composite (new)
-- - fiveG + ptaApproved composite (new)
-- - brandId + releaseYear composite (new)

-- VendorPrice table indexes:
-- - pricePKR (existing)
-- - phoneId + pricePKR composite (new)
-- - vendorId + pricePKR composite (new)

-- These indexes will significantly improve performance for:
-- 1. Brand filtering (brandId)
-- 2. RAM filtering (ramGB)
-- 3. Storage filtering (storageGB)
-- 4. 5G filtering (fiveG)
-- 5. Battery filtering (batteryMAh)
-- 6. Release year filtering (releaseYear)
-- 7. PTA approval filtering (ptaApproved)
-- 8. Display size filtering (displayInch)
-- 9. Price range filtering (pricePKR)
-- 10. Combined filters (composite indexes)

-- To apply these changes, run:
-- npx prisma db push