const { s3, Bucket } = require("./s3Object")();
require("dotenv").config();

//getting new bucket url
const generateUploadUrl = async (req, res) => {
  try {
    const params = {
      Bucket, // name of the bucket
      Key: req.params.name, //unique name for file
      Expires: 120, //url expire time duration
    };

    const url = await s3.getSignedUrlPromise("putObject", params);

    //sending generated url to frontend
    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = generateUploadUrl;
