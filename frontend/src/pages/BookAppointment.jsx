import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    await API.post(
      "/appointments/book",
      {
        patientId: user.id,
        doctorId: id,
        appointmentDate: date,
        appointmentTime: time,
        reason: reason,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment Booked Successfully!");

    navigate("/my-appointments");
  } catch (error) {
    console.log(error);
    alert("Failed to book appointment");
  }
};
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center text-primary mb-4">
              Book Appointment
            </h2>

            <h4 className="text-center mb-4">
              Doctor ID: {id}
            </h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Patient Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Appointment Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Appointment Time
                </label>

                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Reason / Symptoms
                </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your problem"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Confirm Appointment
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;