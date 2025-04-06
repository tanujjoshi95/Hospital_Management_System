import "../styles/Sections.css";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import StaffList from "../components/StaffList";

// import AppointmentDetails from "../components/AppointmentDetails";

const ProfileSection = ({ openCreateAppointementForm }) => {
  const [selectedOption, setSelectedOption] = useState("Records");

  const appointments = [
    {
      date: "5 Dec 2019",
      time: "4:30 PM",
      doctor: "Petunia Dusley",
      status: "Visited",
    },
    {
      date: "2 Dec 2019",
      time: "2:30 PM",
      doctor: "Ashley Tricton",
      status: "Visited",
    },
    {
      date: "28 Nov 2019",
      time: "7:00 PM",
      doctor: "Edward Norman",
      status: "Cancelled",
    },
    {
      date: "22 Nov 2019",
      time: "9:30 AM",
      doctor: "Petunia Dusley",
      status: "Visited",
    },
  ];

  return (
    <div className="section-profile">
      <div className="profile">
        <div className="profile-card">
          <div className="profile-picture">
            <img src="/images/doctor.png" alt="" />
          </div>
          <div className="mb-2 ml-8">
            <h1 className="mb-1 font-bold text-lg capitalize ">Mark Watney</h1>
            <ul className="italic text-sm">
              <li>Gender: Male</li>
              <li>Age: 25</li>
            </ul>
          </div>
        </div>
        <button
          className="apointment-button"
          onClick={openCreateAppointementForm}
        >
          Create Appointment
        </button>
      </div>
      {/* <hr /> */}
      {/* <div className="profile-options">
        <ul className="options-list">
          <li
            className={`${selectedOption === "Profile" && "option-active"}`}
            onClick={() => setSelectedOption("Profile")}
          >
            User Profile
          </li>
          <li
            className={`${selectedOption === "Appointment" && "option-active"}`}
            onClick={() => setSelectedOption("Appointment")}
          >
            Appointment History
          </li>
          <li
            className={`${selectedOption === "Records" && "option-active"}`}
            onClick={() => setSelectedOption("Records")}
          >
            Medical Record
          </li>
        </ul>
      </div> */}

      <div className="border-b border-gray-300 mb-4 flex">
        <button
          className={`py-2 px-4 ${
            selectedOption === "Profile"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedOption("Profile")}
        >
          Personal Details
        </button>
        <button
          className={`py-2 px-4 ${
            selectedOption === "Appointment"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedOption("Appointment")}
        >
          Appointment Details
        </button>
        <button
          className={`py-2 px-4 ${
            selectedOption === "Records"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedOption("Records")}
        >
          Medical Record
        </button>
      </div>
      {selectedOption === "Profile" && (
        <div className="px-8 mt-4 overflow-hidden">
          <div className="flex items-center gap-2">
            Date of Birth:
            <SlCalender className="text-blue-500" /> 11/03/2004
          </div>
          <div className="mt-4">
            <h1 className="font-medium text-xl">Contact Info:</h1>
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline className="text-blue-500 text-2xl" />{" "}
              jane.doe@example.com
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500" /> +91 8745587998
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Ramnagar Road,
              Kashipur, Udham Singh Nagar, Uttarakhand
            </div>
          </div>
          <div className="mt-4">
            <h1 className="font-medium text-xl">Emergency Contact Info:</h1>
            <h2>John Doe</h2>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500" /> +91 8745587998
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Ramnagar Road,
              Kashipur, Udham Singh Nagar, Uttarakhand
            </div>
          </div>
        </div>
      )}
      {selectedOption === "Appointment" && (
        <div className="appointment-list">
          <div className="overflow-auto max-h-64 border rounded-md">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">DATE</th>
                  <th className="p-2">DOCTOR DETAILS</th>
                  <th className="p-2">STATUS</th>
                  <th className="p-2">ATTACHMENT</th>
                  <th className="p-2">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">
                      {appointment.date} <br /> {appointment.time}
                    </td>
                    <td className="p-2">{appointment.doctor}</td>
                    <td
                      className={`p-2 ${
                        appointment.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {appointment.status}
                    </td>
                    <td className="p-2 text-blue-500">
                      <FaFileAlt />
                    </td>
                    <td className="p-2 flex gap-2">
                      <FaEdit className="text-blue-500 cursor-pointer" />
                      <FaDownload className="text-gray-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedOption === "Records" && (
        <div className="medical-record-list">
          <StaffList />
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
ProfileSection.propTypes = {
  openCreateAppointementForm: PropTypes.func,
};
