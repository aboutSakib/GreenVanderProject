const fs = require("fs");
const path = require("path");

// Function to delete an image file
const deleteImage = async (imageUrl) => {
  // Extract the file path from the URL
  const filePath = path.join(__dirname, '../../', imageUrl);

  // Delete the file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting the image: ${err}`);
    } else {
      console.log(`Image deleted: ${filePath}`);
    }
  });
};

module.exports = deleteImage;