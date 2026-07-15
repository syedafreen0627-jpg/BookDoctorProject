import { useEffect, useState } from "react";
import API from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch appointments");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center">No appointments booked yet.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="card shadow p-4 mb-3"
          >
            <h4 className="text-success">
              Appointment Details
            </h4>

            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctorId?.name}
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {appointment.doctorId?.specialization}
            </p>

            <p>
              <strong>Hospital:</strong>{" "}
              {appointment.doctorId?.hospital}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                appointment.appointmentDate
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointment.appointmentTime}
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {appointment.reason}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className="badge bg-warning text-dark">
                {appointment.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;