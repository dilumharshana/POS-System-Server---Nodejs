const aws = require("aws-sdk");
require("dotenv").config();

//congig data for aws bucket
const region = "ap-south-1";
const Bucket = "dilumharshana";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

//creating new S3 object
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

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
    res.status(500).json(error);
  }
};

module.exports = generateUploadUrl;
