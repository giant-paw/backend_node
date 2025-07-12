const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/profile-photos');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak didukung! Hanya .jpg atau .png'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }); // Limit 5MB

module.exports = upload;