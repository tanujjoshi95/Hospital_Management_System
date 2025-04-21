import "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { UserContextProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./Layout/AdminLayout";
import Signup from "./components/patient/Signup";
import Login from "./components/auth/Login";
import LoginLayout from "./Layout/LoginLayout";
import UserLayout from "./Layout/UserLayout";
import UserDashboard from "./components/patient/UserDashboard";
import BookAppointment from "./components/appointment/BookAppointment";
import MedicalHistory from "./components/medical/MedicalHistory";
import StaffList from "./components/staff/StaffList";
import AppointmentsList from "./components/appointment/AppointmentsList";
import StaffProfile from "./components/staff/StaffProfile";
import Dashboard from "./components/Dashboard/Dashboard";
import PatientProfile from "./components/patient/PatientProfile";
import PatientList from "./components/patient/PatientList";
import DiagnosisLoader from "./components/diagnosis/DiagnosisLoader";
import MedicalRecords from "./components/medical/MedicalRecords";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to /login */}
          <Route path="/*" element={<Navigate to="/user/home" replace />} />
          <Route path="/" element={<Navigate to="/user/home" replace />} />

          {/* Home route */}
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<StaffProfile />} />

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
            <Route path="profile" element={<PatientProfile />} />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "doctor"]} />}
          >
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<StaffProfile />} />
              <Route path="staff-list" element={<StaffList />} />
              <Route path="patient-list" element={<PatientList />} />
              <Route path="medical-records" element={<MedicalRecords />} />
              <Route path="appointments-list" element={<AppointmentsList />} />
              <Route path="staff/:id" element={<StaffProfile />} />
            </Route>
            <Route
              path="/appointment/:id/diagnosis"
              element={<DiagnosisLoader />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
