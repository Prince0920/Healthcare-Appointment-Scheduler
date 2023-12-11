const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudnary = async (filePath, setting = { folder: 'avatars' }) => {
  const myCloud = await cloudinary.v2.uploader.upload(filePath, setting);

  // console.log('uploadImageToCloudnary function mycloud', myCloud);
  // Delete the local file after uploading to Cloudinary
  fs.unlink(filePath, err => {
    if (err) {
      console.error('Error deleting local file:', err);
    }
  });

  return myCloud;
};
module.exports = uploadImageToCloudnary;
