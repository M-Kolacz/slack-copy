const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = fs.readFileSync(path.join(__dirname, 'icon.svg'));
const sizes = [16, 48, 128];

async function generate() {
  for (const size of sizes) {
    await sharp(svg)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `icon${size}.png`));
    console.log(`Generated icon${size}.png`);
  }
}

generate().catch(console.error);
