const fs = require("fs");

const getProfilePicture = (req, res) => {
  const filename = req.params.id;

  const options = {
    root: "public/admins/dp/",
  };

  let file = null;

  if (fs.existsSync(`${options.root}/${filename}.jpg`)) {
    file = `${filename}.jpg`;
  }

  if (fs.existsSync(`${options.root}/${filename}.png`)) {
    file = `${filename}.png`;
  }

  if (file) {
    return res.status(200).sendFile(file, options, (err) => {
      if (err) return res.status(404).json("unable to load photo");
    });
  }

  return res.status(200).json(null);
};

module.exports = getProfilePicture;
