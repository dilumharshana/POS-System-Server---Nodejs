const aws = require("aws-sdk");
require("dotenv").config();

const s3Object = () => {
  //congig data for aws bucket
  const region = "ap-south-1";
  const Bucket = "appstockimages";
  const accessKeyId = process.env.AWS_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SECRET_KEY;

  //creating new S3 object
  return {
    s3: new aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
      signatureVersion: "v4",
    }),
    Bucket,
  };
};

module.exports = s3Object;
