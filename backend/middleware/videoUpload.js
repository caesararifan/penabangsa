import multer from 'multer';
import path from 'path';

// Kita tidak pakai 'fs' dan diskStorage lagi karena Vercel itu Read-Only (tidak bisa bikin folder/simpan file)
// Sebagai gantinya, kita simpan sementara di RAM (Memory)
const storage = multer.memoryStorage();

export const uploadVideo = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limit 100MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.mp4' || ext === '.mkv' || ext === '.mov') {
      return cb(null, true);
    }
    cb(new Error("Format video harus mp4, mkv, atau mov!"));
  }
});