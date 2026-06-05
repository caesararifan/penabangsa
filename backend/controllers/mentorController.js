import prisma from "../db.js";
import fs from "fs"; // <-- WAJIB TAMBAH INI BUAT HAPUS FILE FISIK GAMBAR

export const getMentorStats = async (req, res) => {
  try {
    const mentorId = Number(req.user.id);

    const courses = await prisma.course.findMany({
      where: { authorId: mentorId },
      include: {
        _count: { select: { enrollments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalStudentsData = await prisma.enrollment.findMany({
      where: { course: { authorId: mentorId } },
      distinct: ['studentId']
    });

    res.json({
      activeCourses: courses.length,
      totalStudents: totalStudentsData.length,
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        thumbnail: c.thumbnail, // Thumbnail yang tadi udah bener
        _count: { enrollments: c._count.enrollments }
      }))
    });
  } catch (error) {
    console.error("Error Stats:", error);
    res.status(500).json({ message: "Gagal memuat statistik mentor" });
  }
};

export const createCourse = async (req, res) => {
  const { title } = req.body;
  const imageFile = req.file;

  try {
    const newCourse = await prisma.course.create({
      data: {
        title: title,
        thumbnail: imageFile ? imageFile.path : null, 
        author: {
          connect: { id: req.user.id }
        }
      }
    });

    console.log("✅ Kursus Berhasil Dibuat:", newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("ERROR CREATE COURSE:", error);
    res.status(500).json({ message: "Gagal membuat kursus ke database" });
  }
};

export const addLesson = async (req, res) => {
  try {
    const { title, courseId } = req.body;
    const videoFile = req.file;

    if (!title || !courseId || !videoFile) {
      return res.status(400).json({ message: "Data atau file video tidak lengkap!" });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        videoPath: videoFile.path,
        courseId: Number(courseId)
      }
    });

    res.status(201).json({ message: "Materi berhasil diunggah! 🎬", lesson });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: "Gagal mengunggah materi" });
  }
};

export const getCourseDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: { 
        lessons: true 
      } 
    });

    if (!course) {
      return res.status(404).json({ message: "Kursus tidak ditemukan" });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

// ==========================================
// TAMBAHAN BARU: UPDATE & DELETE KURSUS
// ==========================================

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const imageFile = req.file;

  try {
    // 1. Cek kursus punya mentor ini atau bukan
    const existingCourse = await prisma.course.findUnique({ where: { id: Number(id) } });
    if (!existingCourse) return res.status(404).json({ message: "Kursus tidak ditemukan" });
    if (existingCourse.authorId !== Number(req.user.id)) return res.status(403).json({ message: "Akses ditolak!" });

    const updateData = { title: title };

    // 2. Kalau mentor masukin gambar baru, hapus gambar lama dari folder Windows
    if (imageFile) {
      updateData.thumbnail = imageFile.path;
      if (existingCourse.thumbnail) {
        try {
          fs.unlinkSync(existingCourse.thumbnail);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          console.log("Gambar lama udah ilang, aman.");
        }
      }
    }

    // 3. Update database
    const updatedCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: updateData
    });

    res.json({ message: "Kursus berhasil diperbarui! ✏️", course: updatedCourse });
  } catch (error) {
    console.error("ERROR UPDATE COURSE:", error);
    res.status(500).json({ message: "Gagal memperbarui kursus" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Cek kursus
    const course = await prisma.course.findUnique({ where: { id: Number(id) } });
    if (!course) return res.status(404).json({ message: "Kursus tidak ditemukan" });
    if (course.authorId !== Number(req.user.id)) return res.status(403).json({ message: "Akses ditolak!" });

    // 2. Hapus file gambar dari folder Windows biar gak menuh-menuhin laptop
    if (course.thumbnail) {
      try {
        fs.unlinkSync(course.thumbnail);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log("File gambar sudah tidak ada.");
      }
    }

    // 3. Hapus dari database
    await prisma.course.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Kursus berhasil dihapus permanen! 🗑️" });
  } catch (error) {
    console.error("ERROR DELETE COURSE:", error);
    res.status(500).json({ message: "Gagal menghapus kursus" });
  }
};