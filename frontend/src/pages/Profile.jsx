import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">
        My Profile
      </h2>

      <div className="card p-4 mt-4 shadow">

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

      </div>
    </div>
  );
}

export default Profile