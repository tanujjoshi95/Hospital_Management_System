import "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { UserContextProvider } from "./contexts/UserContext";
import ProtectedRoute from "./protectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./Layout/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import Signup from "./components/Signup";
import Login from "./components/Login";
import LoginLayout from "./Layout/LoginLayout";
import UserLayout from "./Layout/UserLayout";
import ProfileSection from "./sections/ProfileSection";
import UserDashboard from "./pages/UserDashboard";
import BookAppointment from "./components/BookAppointment";
import MedicalHistory from "./components/MedicalHistory";
import StaffList from "./components/StaffList";
import AppointmentsList from "./components/AppointmentsList";
// import DockPanelComponent from "./testing/DockPanel";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to /login */}
          <Route path="/*" element={<Navigate to="/user/home" replace />} />

          {/* Home route */}
          {/* <Route path="/home" element={<Home />} /> */}

          {/* <Route path="/test" element={<DockPanelComponent />} /> */}

          {/* Authentication routes under LoginPage layout */}
          <Route path="/" element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signup />} />
          </Route>
          <Route path="/user" element={<UserLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="book-appointment" element={<BookAppointment />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="appointments" element={<AppointmentsList />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="staff-list" element={<StaffList />} />
            <Route path="profile" element={<ProfileSection />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="profile" element={<ProfileSection />} />
              <Route path="staff-list" element={<StaffList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
