const Doctor = require("../models/Doctor");

// Add Doctor
const addDoctor = async (req, res) => {
  try {

    const {
      name,
      specialization,
      experience,
      qualification,
      hospital,
      fees,
      phone,
      email,
      availableDays,
      availableTime
    } = req.body;

    const doctor = new Doctor({
      name,
      specialization,
      experience,
      qualification,
      hospital,
      fees,
      phone,
      email,
      availableDays,
      availableTime
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor Added Successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const doctors = await Doctor.find()
      .skip(skip)
      .limit(limit);

    const totalDoctors = await Doctor.countDocuments();

    res.status(200).json({
      message: "Doctors fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalDoctors / limit),
      totalDoctors,
      count: doctors.length,
      doctors
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Search Doctors
const searchDoctors = async (req, res) => {
  try {

    const { specialization, hospital, name } = req.query;

    let filter = {};

    if (specialization) {
      filter.specialization = {
        $regex: specialization,
        $options: "i"
      };
    }

    if (hospital) {
      filter.hospital = {
        $regex: hospital,
        $options: "i"
      };
    }

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i"
      };
    }

    const doctors = await Doctor.find(filter);

    res.status(200).json({
      message: "Doctors fetched successfully",
      count: doctors.length,
      doctors
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Doctor By ID
const getDoctorById = async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      message: "Doctor fetched successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Doctor
const updateDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
  try {

    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    res.status(200).json({
      message: "Doctor deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  addDoctor,
  getAllDoctors,
  searchDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};