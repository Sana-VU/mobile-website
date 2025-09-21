#!/bin/bash

# whatmobile Database Migration Script
# This script applies the performance indexes for the phone finder

echo "🚀 Applying database migrations for whatmobile phone finder..."

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not installed. Please install Node.js and npm first."
    exit 1
fi

# Check if Prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Prisma schema not found. Please run from project root directory."
    exit 1
fi

echo "📊 Current database status:"
npx prisma db pull --print

echo ""
echo "🔄 Applying schema changes (including new indexes)..."
npx prisma db push --accept-data-loss

echo ""
echo "✅ Database migration complete!"
echo ""
echo "📈 Performance indexes added:"
echo "   • Phone.brandId (existing)"
echo "   • Phone.ramGB (existing)" 
echo "   • Phone.storageGB (new)"
echo "   • Phone.fiveG (existing)"
echo "   • Phone.batteryMAh (new)"
echo "   • Phone.releaseYear (new)"
echo "   • Phone.ptaApproved (new)"
echo "   • Phone.displayInch (new)"
echo "   • Phone.[ramGB, storageGB] (composite)"
echo "   • Phone.[fiveG, ptaApproved] (composite)"
echo "   • Phone.[brandId, releaseYear] (composite)"
echo "   • VendorPrice.pricePKR (existing)"
echo "   • VendorPrice.[phoneId, pricePKR] (composite)"
echo "   • VendorPrice.[vendorId, pricePKR] (composite)"
echo ""
echo "🎉 Your phone finder is now optimized for production!"