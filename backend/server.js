// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Middleware Dasar
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Akses Static Folder (URUTAN KRUSIAL)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Rute API
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server Pena Bangsa Running on Port ${PORT}`);
  console.log(`📁 Folder Statis: ${path.join(__dirname, 'uploads')}`);
});