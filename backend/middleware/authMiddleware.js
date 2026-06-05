/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // Ambil token dari header 'Authorization: Bearer <token>'
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user (id & role) ke object request
    next(); // Lanjutkan ke fungsi berikutnya (Controller)
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid atau kedaluwarsa!" });
  }
};