const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  getDashboardStats
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);

module.exports = router;