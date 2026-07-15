const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d"
  }
);

res.json({
  message: "Login Successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Users (Admin Only)
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Admin Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalDoctors = await Doctor.countDocuments();

    const totalAppointments = await Appointment.countDocuments();

    const pendingAppointments = await Appointment.countDocuments({
      status: "Pending"
    });

    const approvedAppointments = await Appointment.countDocuments({
      status: "Approved"
    });

    res.status(200).json({
      totalUsers,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
      approvedAppointments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  getDashboardStats
};