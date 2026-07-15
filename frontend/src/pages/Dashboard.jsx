import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (error) {
        console.log(error);
        alert("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center p-4 shadow">
            <h3>Doctors</h3>
            <h1>{stats.totalDoctors}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-4 shadow">
            <h3>Appointments</h3>
            <h1>{stats.totalAppointments}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-4 shadow">
            <h3>Users</h3>
            <h1>{stats.totalUsers}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;