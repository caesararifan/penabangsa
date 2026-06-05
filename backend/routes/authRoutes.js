import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { 
  getMentorStats, 
  createCourse, 
  addLesson, 
  getCourseDetail,
  updateCourse,  // <-- WAJIB IMPORT INI
  deleteCourse   // <-- WAJIB IMPORT INI
} from "../controllers/mentorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadVideo } from "../middleware/videoUpload.js";
import { uploadImage } from '../middleware/imageUpload.js';

const router = express.Router();

// ==========================================
// 1. AUTH & PUBLIC ROUTES
// ==========================================
router.post("/login", login);

// Register pakai uploadImage karena sertifikat itu file gambar (jpg/png)
router.post("/register", uploadImage.single('certificate'), register);

// ==========================================
// 2. MENTOR & COURSE ROUTES (Terproteksi)
// ==========================================

// Buat Kursus Baru
router.post("/courses", protect, uploadImage.single('image'), createCourse);

// Ambil Stats Dashboard
router.get("/mentor-stats", protect, getMentorStats);

// Ambil Detail 1 Kursus
router.get("/courses/:id", protect, getCourseDetail);

// --- RUTE BARU: UPDATE KURSUS ---
// Pakai 'protect' dan 'uploadImage' menyesuaikan kodingan kamu
router.put('/courses/:id', protect, uploadImage.single('image'), updateCourse);

// --- RUTE BARU: HAPUS KURSUS ---
router.delete('/courses/:id', protect, deleteCourse);

// Upload Video Materi
router.post("/lessons", protect, uploadVideo.single('video'), addLesson);

// ==========================================
// 3. USER PROFILE
// ==========================================
router.get("/profile", protect, getProfile);

export default router;