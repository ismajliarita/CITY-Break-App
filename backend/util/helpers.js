const fs = require('fs');
const path = require('path');

// Function to convert an image to a base64 string
function imageToBase64(imagePath) {
  const image = fs.readFileSync(imagePath);
  return Buffer.from(image).toString('base64');
}

// Function to convert a base64 string to an image file
function base64ToImage(base64Str, filename) {
  let filePath = path.join(__dirname, filename);

  // Check if a file with the same name already exists
  if (fs.existsSync(filePath)) {
    // If it does, append a timestamp to the filename
    const timestamp = Date.now();
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    filename = `${name}-${timestamp}${ext}`;
    filePath = path.join(__dirname, filename);
  }

  const bitmap = Buffer.from(base64Str, 'base64');
  fs.writeFileSync(filePath, bitmap);
}

module.exports = { imageToBase64, base64ToImage };