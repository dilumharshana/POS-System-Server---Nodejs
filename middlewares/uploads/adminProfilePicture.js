const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "./public/admins/dp");
  },

  filename: (req, file, fname) =>
    fname(null, req.params.id + path.extname(file.originalname)),
});

const uploads = multer({ storage });

module.exports = uploads;
