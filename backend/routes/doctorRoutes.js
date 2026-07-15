const express = require("express");
const router = express.Router();

const {
  addDoctor,
  getAllDoctors,
  searchDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Add Doctor (Admin Only)
router.post("/add", authMiddleware, adminMiddleware, addDoctor);

// Get All Doctors
router.get("/", getAllDoctors);

// Search Doctors
router.get("/search", searchDoctors);

// Get Doctor By ID
router.get("/:id", getDoctorById);

// Update Doctor (Admin Only)
router.put("/:id", authMiddleware, adminMiddleware, updateDoctor);

// Delete Doctor (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteDoctor);

module.exports = router;