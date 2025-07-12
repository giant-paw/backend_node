const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { nama, email, kata_sandi } = req.body;

  try {
    const existingUser = await prisma.pengguna.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const hashedPassword = await bcrypt.hash(kata_sandi, 12);

    const dataToCreate = {
      nama,
      email,
      kata_sandi: hashedPassword,
      role: 'USER_PEMBELAJAR',
    };

    if (req.file) {
      dataToCreate.path_foto_profil = path.join('images/profile-photos', req.file.filename).replace(/\\/g, "/");
    }

    const user = await prisma.pengguna.create({ data: dataToCreate });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );

    res.status(201).json({
      message: 'Registrasi berhasil',
      accessToken: token,
      user: {
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server.', error: error.message });
  }
};

exports.login = async (req, res) => {
    res.status(200).json({ message: 'Endpoint login siap.' });
};