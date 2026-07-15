const express = require("express");
const router = express.Router();

const {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
} = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Book Appointment
router.post("/book", authMiddleware, bookAppointment);

// Admin Only
router.get("/", authMiddleware, adminMiddleware, getAllAppointments);

// Get My Appointments
router.get("/my", authMiddleware, getMyAppointments);

// Get Appointment By ID
router.get("/:id", authMiddleware, getAppointmentById);

// Admin Only
router.put("/:id/status", authMiddleware, adminMiddleware, updateAppointmentStatus);

// Admin Only
router.delete("/:id", authMiddleware, adminMiddleware, deleteAppointment);

module.exports = router;