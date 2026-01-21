import fs from 'fs';

const files = fs.readdirSync(process.cwd()).filter(file =>
  /\.(png|jpg|jpeg|jfif|webp|gif|bmp|tiff|svg|heic|heif|eif)$/i.test(file)
);

console.log('Total images:', files.length);
files.forEach(f => console.log(f));
