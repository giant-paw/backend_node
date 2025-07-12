const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../middleware/upload'); // Import middleware upload kita

const router = express.Router();

router.post('/register', upload.single('foto_profil'), register);

router.post('/login', login);

module.exports = router;