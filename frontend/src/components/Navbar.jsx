import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully!");

    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand" to="/">
          🏥 Book Doctor
        </Link>

        <div className="collapse navbar-collapse">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/doctors">
                Doctors
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm mt-1 ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                 <Link className="nav-link" to="/profile">
                   Profile
                 </Link>
              </li>
              </>
            )}

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;