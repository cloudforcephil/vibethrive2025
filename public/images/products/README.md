# Product Images Folder

## Instructions for Adding Your Red Bucket Hat Images

To replace the placeholder images with your actual red bucket hat photos:

1. **Save your three red bucket hat images with these exact names:**
   - `red-bucket-hat-front.jpg` - Front view of the red pattern bucket hat
   - `red-bucket-hat-angle.jpg` - Angled view showing the side profile
   - `red-bucket-hat-detail.jpg` - Close-up detail view of the pattern

2. **Place them in this folder:** 
   `/public/images/products/`

3. **Update the product data** in `src/lib/data.ts` to use these images:
   ```javascript
   images: [
     '/images/products/red-bucket-hat-front.jpg',
     '/images/products/red-bucket-hat-angle.jpg', 
     '/images/products/red-bucket-hat-detail.jpg',
     '/placeholder-bucket-hat.svg', // Fallback
   ],
   ```

4. **Recommended image specifications:**
   - Format: JPG or PNG
   - Size: 800x800 pixels (square aspect ratio)
   - Quality: High resolution for product photography
   - File size: Under 1MB each for optimal loading

## Current Status
- ✅ Folder structure created
- ✅ Fallback placeholder working
- ⏳ Waiting for actual product images
- ✅ Product data updated for red pattern theme