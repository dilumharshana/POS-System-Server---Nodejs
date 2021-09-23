const fs = require("fs");

const deleteProfilePicture = (req, res) => {
  const path = "public/admins/dp";
  let file = null;
  if (fs.existsSync(`${path}/${req.params.id}.jpg`)) {
    file = `${path}/${req.params.id}.jpg`;
  }
  if (fs.existsSync(`${path}/${req.params.id}.png`)) {
    file = `${path}/${req.params.id}.png`;
  }
  if (file) {
    fs.unlinkSync(file);
    return res.status(200).json("File Deleted Successfully !");
  }
  return res.status(404).json("No image found !");
};

module.exports = deleteProfilePicture;
