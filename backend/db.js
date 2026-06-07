import pg from 'pg';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const { Pool } = pg;

// Konfigurasi Pool menggunakan variabel env kamu
const pool = new Pool({
  // eslint-disable-next-line no-undef
  user: process.env.DB_USER,
  // eslint-disable-next-line no-undef
  password: process.env.DB_PASSWORD,
  // eslint-disable-next-line no-undef
  host: process.env.DB_HOST,
  // eslint-disable-next-line no-undef
  port: process.env.DB_PORT,
  // eslint-disable-next-line no-undef
  database: process.env.DB_NAME,
});

// 1. BUAT ADAPTER
const adapter = new PrismaPg(pool);

// 2. INISIALISASI PRISMA (Variabel ini yang akan kita ekspor)
const prisma = new PrismaClient({ adapter });

// Tes Koneksi sederhana
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Gagal koneksi ke Postgres:', err.stack);
  }
  console.log('🐘 Terhubung ke Database PostgreSQL Pena Bangsa');
  release();
});

// 3. EKSPOR PRISMA
export default prisma;