import { useEffect, useState } from "react";
import API from "../services/api";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
      alert("Failed to load appointments");
    }
  };

  const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/appointments/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Status Updated Successfully");
    fetchAppointments();

  } catch (error) {
    console.log(error);
    alert("Failed to update status");
  }
};

const deleteAppointment = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Appointment Deleted");
    fetchAppointments();

  } catch (error) {
    console.log(error);
    alert("Failed to delete appointment");
  }
};

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        All Appointments
      </h2>

      {appointments.length === 0 ? (
        <h5 className="text-center">
          No Appointments Found
        </h5>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="card shadow p-3 mb-3"
          >
            <h4>
              Doctor: {appointment.doctorId?.name}
            </h4>

            <p>
              <strong>Patient:</strong>{" "}
              {appointment.patientId?.name}
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
              <strong>Status:</strong>{" "}
              {appointment.status}
            </p>

            <div className="mt-3">

  <button
    className="btn btn-success me-2"
    onClick={() => updateStatus(appointment._id, "Approved")}
  >
    Approve
  </button>

  <button
    className="btn btn-primary me-2"
    onClick={() => updateStatus(appointment._id, "Completed")}
  >
    Complete
  </button>

  <button
    className="btn btn-warning me-2"
    onClick={() => updateStatus(appointment._id, "Cancelled")}
  >
    Cancel
  </button>

  <button
    className="btn btn-danger"
    onClick={() => deleteAppointment(appointment._id)}
  >
    Delete
  </button>

</div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminAppointments