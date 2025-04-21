import { useState } from "react";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { bookAppointment } from "../../data/server";
import PropTypes from "prop-types";

const BookAppointment = ({ onCLose }) => {
  BookAppointment.propTypes = {
    onCLose: PropTypes.func.isRequired,
  };
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const departments = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Internal Medicine",
    "Dermatology",
    "Ophthalmology",
    "Gastroenterology",
  ];

  const doctors = {
    Cardiology: [
      { id: "STF001", name: "Dr. John Smith" },
      { id: "STF007", name: "Dr. Michael Chen" },
    ],
    Neurology: [{ id: "STF007", name: "Dr. Michael Chen" }],
    Pediatrics: [{ id: "STF002", name: "Dr. Priya Kumar" }],
    Orthopedics: [{ id: "STF009", name: "Dr. Robert Williams" }],
    "Internal Medicine": [{ id: "STF001", name: "Dr. John Smith" }],
    Dermatology: [{ id: "STF002", name: "Dr. Priya Kumar" }],
    Ophthalmology: [{ id: "STF009", name: "Dr. Robert Williams" }],
    Gastroenterology: [{ id: "STF001", name: "Dr. John Smith" }],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Appointment booking:", formData);
    try {
      const result = await bookAppointment({
        patientID: "PAT123456", // This should be the logged-in patient's ID in a real app
        doctorID: formData.doctor, // Now this is the actual doctor ID
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        duration: 30, // Default duration in minutes
        status: "Scheduled",
        type: formData.department + " Consultation",
        notes: formData.reason,
        department: formData.department,
      });

      if (result.success) {
        alert("Appointment booked successfully!");
        setFormData({
          department: "",
          doctor: "",
          date: "",
          time: "",
          reason: "",
        });
        onCLose();
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" ? { doctor: "" } : {}),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Book an Appointment
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <Stethoscope className="h-5 w-5 text-gray-400 mr-2" />
                  Department
                </div>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  Doctor
                </div>
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                required
                disabled={!formData.department}
              >
                <option value="">Select Doctor</option>
                {formData.department &&
                  doctors[formData.department].map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {formData.department} Specialist
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    Preferred Date
                  </div>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    Preferred Time
                  </div>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please describe your symptoms or reason for visit"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Appointment
              </button>
              <button
                onClick={onCLose}
                className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
