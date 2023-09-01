"use strict";

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configura o Cloudinary Service
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

exports.send = async (image) => {
  const result = await cloudinary.uploader.upload(image);
  return result;
};
