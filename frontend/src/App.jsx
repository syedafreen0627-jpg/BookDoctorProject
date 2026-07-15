import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import Dashboard from "./pages/Dashboard";
import AdminAppointments from "./pages/AdminAppointments";
import Profile from "./pages/Profile";
import AdminDoctors from "./pages/AdminDoctors";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/book/:id" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/admin-appointments"
  element={
    <ProtectedRoute>
      <AdminAppointments />
    </ProtectedRoute>
  }
/>
        <Route path="/profile" element={<Profile />} />
        <Route
  path="/admin-doctors"
  element={
    <ProtectedRoute>
      <AdminDoctors />
    </ProtectedRoute>
  }
/>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;