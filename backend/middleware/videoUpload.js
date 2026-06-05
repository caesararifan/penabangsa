import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Pastikan folder folder 'uploads/videos' ada
const dir = './uploads/videos';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

export const uploadVideo = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit 100MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.mp4' || ext === '.mkv' || ext === '.mov') return cb(null, true);
    cb(new Error("Format video harus mp4, mkv, atau mov!"));
  }
});