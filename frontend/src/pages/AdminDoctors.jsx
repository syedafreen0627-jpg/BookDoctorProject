import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  
  const [showForm, setShowForm] = useState(false);

  const [doctor, setDoctor] = useState({
  name: "",
  specialization: "",
  hospital: "",
  experience: "",
  fees: "",
});

const [editingDoctorId, setEditingDoctorId] = useState(null);
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

  const saveDoctor = async () => {
  try {
    const token = localStorage.getItem("token");

    if (editingDoctorId) {
      // Update Doctor
      await API.put(
        `/doctors/${editingDoctorId}`,
        doctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Doctor Updated Successfully");
    } else {
      // Add Doctor
      await API.post(
        "/doctors/add",
        doctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Doctor Added Successfully");
    }

    setDoctor({
      name: "",
      specialization: "",
      hospital: "",
      experience: "",
      fees: "",
    });

    setEditingDoctorId(null);

    setShowForm(false);

    fetchDoctors();

  } catch (error) {
    console.log(error.response);
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Failed");
  }
};

const handleEdit = (selectedDoctor) => {
  setDoctor({
    name: selectedDoctor.name,
    specialization: selectedDoctor.specialization,
    hospital: selectedDoctor.hospital,
    experience: selectedDoctor.experience,
    fees: selectedDoctor.fees,
  });

  setEditingDoctorId(selectedDoctor._id);

  setShowForm(true);
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this doctor?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/doctors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Doctor Deleted Successfully");

    fetchDoctors();
  } catch (error) {
    console.log(error.response);
    alert(error.response?.data?.message || "Failed to delete doctor");
  }
};
  
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">

  <h2 className="text-primary">
    Manage Doctors
  </h2>

  <button
  className="btn btn-success"
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? "Close" : "+ Add Doctor"}
</button>

</div>

{showForm && (
  <div className="card p-4 shadow mb-4">
    <h4 className="mb-3">Add New Doctor</h4>

    <input
  type="text"
  className="form-control mb-2"
  placeholder="Doctor Name"
  value={doctor.name}
  onChange={(e) =>
    setDoctor({
      ...doctor,
      name: e.target.value,
    })
  }
/>

    <input
  type="text"
  className="form-control mb-2"
  placeholder="Specialization"
  value={doctor.specialization}
  onChange={(e) =>
    setDoctor({
      ...doctor,
      specialization: e.target.value,
    })
  }
/>

    <input
  type="text"
  className="form-control mb-2"
  placeholder="Hospital"
  value={doctor.hospital}
  onChange={(e) =>
    setDoctor({
      ...doctor,
      hospital: e.target.value,
    })
  }
/>

    <input
  type="number"
  className="form-control mb-2"
  placeholder="Experience"
  value={doctor.experience}
  onChange={(e) =>
    setDoctor({
      ...doctor,
      experience: e.target.value,
    })
  }
/>

    <input
  type="number"
  className="form-control mb-3"
  placeholder="Fees"
  value={doctor.fees}
  onChange={(e) =>
    setDoctor({
      ...doctor,
      fees: e.target.value,
    })
  }
/>

    <button
  className="btn btn-primary"
  onClick={saveDoctor}
>
  Save Doctor
</button>
  </div>
)}

      {doctors.length === 0 ? (
        <h4 className="text-center">No Doctors Found</h4>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="card shadow p-3 mb-3"
          >
            <h4>{doctor.name}</h4>

            <p>
              <strong>Specialization:</strong>{" "}
              {doctor.specialization}
            </p>

            <p>
              <strong>Hospital:</strong>{" "}
              {doctor.hospital}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {doctor.experience} Years
            </p>

            <p>
              <strong>Fees:</strong> ₹{doctor.fees}
            </p>

            <div className="mt-3">
  <button
  className="btn btn-warning me-2"
  onClick={() => handleEdit(doctor)}
>
  Edit
</button>

  <button
  className="btn btn-danger"
  onClick={() => handleDelete(doctor._id)}
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

export default AdminDoctors;