// DiagnosisForm.jsx
import { useState } from "react";
import DiagnosisPreviewModal from "./DiagnosisPreviewModal";

import PropTypes from "prop-types";

const DiagnosisForm = ({ patientData, doctorData, appointmentData }) => {
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescription: "",
    notes: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Diagnosis</h2>

      {/* Auto-filled details */}
      <div className="mb-4 space-y-1 text-gray-700">
        <p>
          <strong>Patient:</strong> {patientData.name} ({patientData.age} yrs,{" "}
          {patientData.gender})
        </p>
        <p>
          <strong>Doctor:</strong> {doctorData.name} ({doctorData.department})
        </p>
        <p>
          <strong>Appointment Date:</strong> {appointmentData.date}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="diagnosis"
          placeholder="Diagnosis"
          className="w-full p-2 border rounded"
          required
          onChange={handleChange}
        />
        <textarea
          name="prescription"
          placeholder="Prescription"
          className="w-full p-2 border rounded"
          required
          onChange={handleChange}
        />
        <textarea
          name="notes"
          placeholder="Additional Notes"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Preview
        </button>
      </form>

      {showPreview && (
        <DiagnosisPreviewModal
          patientData={patientData}
          doctorData={doctorData}
          appointmentData={appointmentData}
          formData={formData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default DiagnosisForm;
DiagnosisForm.propTypes = {
  patientData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
  doctorData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
  appointmentData: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
};
