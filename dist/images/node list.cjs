// index.cjs - Run this in frontend/public/images/ folder
import { readdirSync } from 'fs';
import { join } from 'path';

const files = readdirSync('./');

const hoodieImages = files.filter(file => 
    file.includes('hoodie') || 
    file.includes('hoody') ||
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
);

console.log('📁 Total images found:', hoodieImages.length);
console.log('\n📋 All image files:');
hoodieImages.forEach((file, i) => {
    console.log(`${i+1}. ${file}`);
});

// Show file extensions summary
const extensions = {};
hoodieImages.forEach(file => {
    const ext = file.split('.').pop().toLowerCase();
    extensions[ext] = (extensions[ext] || 0) + 1;
});

console.log('\n📊 File extensions:');
Object.entries(extensions).forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} files`);
});

// Generate seed code
console.log('\n📦 READY TO COPY seedProducts.js CODE:\n');
console.log('const hoodies = [');
hoodieImages.forEach((file, index) => {
    const category = index % 2 === 0 ? 'men' : 'women';
    const colors = ['Black', 'White', 'Gray', 'Blue', 'Navy', 'Charcoal', 'Red', 'Green'];
    const color = colors[index % colors.length];
    
    console.log(`  {
    name: "${color} Hoodie ${index + 1}",
    description: "Premium ${color.toLowerCase()} hoodie for developers",
    price: ${4999 + (index * 200)},
    category: "${category}",
    image: "/images/${file}",
    stock: ${20 + index},
    ratings: ${(4.5 + (index * 0.05)).toFixed(1)},
    numReviews: ${index * 2},
    featured: ${index < 4}
  },`);
});
console.log('];');