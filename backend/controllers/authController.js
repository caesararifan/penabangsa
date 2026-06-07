import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// --- REGISTER CONTROLLER ---
export const register = async (req, res) => {
  // req.body sekarang aman karena sudah diproses Multer di routes
  const { name, email, password, role, expertise } = req.body;

  // 1. Validasi Input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nama, Email, dan Password wajib diisi!" });
  }

  try {
    // 2. Cek User Unik
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Email sudah terdaftar!" });

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Simpan ke Database
    const newUser = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword, 
        role: role || 'student',
        // Jika mentor, simpan data tambahannya
        expertise: role === 'mentor' ? expertise : null,
        certificatePath: req.file ? req.file.path : null, // Path file dari Multer
        isVerified: role === 'student' // Student langsung aktif, Mentor nunggu verifikasi
      },
    });

    res.status(201).json({ 
      message: role === 'mentor' 
        ? "Registrasi Berhasil! Mohon tunggu verifikasi admin 24 jam. 🎉" 
        : "Registrasi Berhasil! Silakan masuk ke akun Anda. 🎉", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });

  } catch (error) {
    console.error("Error Register:", error);
    res.status(500).json({ message: "Terjadi kesalahan sistem saat registrasi" });
  }
};

// --- LOGIN CONTROLLER ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email tidak ditemukan!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password salah!" });

    // Buat Token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login Berhasil! 🔓",
      token,
      user: { id: user.id, name: user.name, role: user.role }
    });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: "Gagal login, coba lagi nanti" });
  }
};

// --- GET PROFILE ---
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, expertise: true }
    });
    res.json(user);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data profil" });
  }
};