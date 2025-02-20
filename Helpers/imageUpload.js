const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = file.fieldname + "-" + Date.now() +  file.originalname.replace(/ /g, "");
    cb(null, filename);
  },
  destination : (req, file , cb) => {
    if (!fs.existsSync("public/storage")) {
        fs.mkdirSync("public/storage");
      }
      cb(null, "public/storage");
  }
});

const upload = multer({ storage });

module.exports = upload;