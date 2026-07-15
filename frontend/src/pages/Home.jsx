import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">

      <h1 className="display-4 fw-bold text-primary">
        Welcome to Book Doctor
      </h1>

      <p className="lead mt-3">
        Find experienced doctors and book appointments online in minutes.
      </p>

      <div className="mt-4">

        <Link to="/doctors" className="btn btn-primary btn-lg me-3">
          View Doctors
        </Link>

        <Link to="/register" className="btn btn-outline-primary btn-lg">
          Register Now
        </Link>

      </div>

      <div className="row mt-5">

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3>👨‍⚕️ Doctors</h3>
            <p>Experienced specialists available.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3>📅 Appointments</h3>
            <p>Book appointments in just one click.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-4">
            <h3>🏥 Hospital</h3>
            <p>Fast, secure and easy healthcare management.</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;