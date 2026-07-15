import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data.doctors);
    } catch (error) {
      console.log(error);
      alert("Failed to load doctors");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        Our Expert Doctors
      </h2>

      <div className="row">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-md-6 mb-4">

            <div className="card shadow-lg h-100">

              <div className="card-body text-center">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                  alt="Doctor"
                  width="100"
                  className="mb-3"
                />

                <h3>{doctor.name}</h3>

                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>

                <p>
                  <strong>Hospital:</strong> {doctor.hospital}
                </p>

                <p>
                  <strong>Experience:</strong> {doctor.experience} Years
                </p>

                <p>
                  <strong>Consultation Fee:</strong> ₹{doctor.fees}
                </p>

                <Link
                  to={`/book/${doctor._id}`}
                  className="btn btn-primary"
                >
                  Book Appointment
                </Link>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;