// backend/prisma.config.ts
import 'dotenv/config'; // KUNCI UTAMA: Harus load dotenv di sini!
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Kita pastikan url-nya terbaca, kalau tidak ada kita kasih proteksi
    url: process.env.DATABASE_URL,
  },
});