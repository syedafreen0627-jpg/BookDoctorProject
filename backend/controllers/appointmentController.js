const Appointment = require("../models/Appointment");

// Book Appointment
const bookAppointment = async (req, res) => {
  try {

    const {
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason
    } = req.body;

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate("patientId", "name email phone")
      .populate("doctorId", "name specialization hospital");

    res.status(200).json({
      message: "Appointments fetched successfully",
      count: appointments.length,
      appointments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get My Appointments
const getMyAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      patientId: req.user.id
    })
      .populate("doctorId", "name specialization hospital");

    res.status(200).json({
      message: "My appointments fetched successfully",
      count: appointments.length,
      appointments
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Appointment By ID
const getAppointmentById = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId", "name email phone")
      .populate("doctorId", "name specialization hospital");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment fetched successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Appointment Status
const updateAppointmentStatus = async (req, res) => {
  try {

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
};