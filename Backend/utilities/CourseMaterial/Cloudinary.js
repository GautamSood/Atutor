
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({ 
  cloud_name:"course-mgmt-system",
  api_key:"241147735388973",
  api_secret:"cnzVIEzVURbjz7ylv3yfmr4dWng"
  });
module.exports = cloudinary;