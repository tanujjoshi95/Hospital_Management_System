// DiagnosisPreviewModal.jsx
import "react";

import PropTypes from "prop-types";

const DiagnosisPreviewModal = ({
  patientData,
  doctorData,
  appointmentData,
  formData,
  onClose,
}) => {
  const handleConfirm = () => {
    // TODO: Send to backend API
    console.log("Saving to DB:", {
      ...patientData,
      ...doctorData,
      ...appointmentData,
      ...formData,
    });
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-xl">
        <h3 className="text-xl font-semibold mb-4">Preview Medical Record</h3>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>Patient:</strong> {patientData.name} ({patientData.age} yrs,{" "}
            {patientData.gender})
          </p>
          <p>
            <strong>Doctor:</strong> {doctorData.name}
          </p>
          <p>
            <strong>Appointment Date:</strong> {appointmentData.date}
          </p>
          <hr />
          <p>
            <strong>Diagnosis:</strong> {formData.diagnosis}
          </p>
          <p>
            <strong>Prescription:</strong> {formData.prescription}
          </p>
          <p>
            <strong>Notes:</strong> {formData.notes}
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisPreviewModal;

DiagnosisPreviewModal.propTypes = {
  patientData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
  }).isRequired,
  doctorData: PropTypes.object.isRequired,
  appointmentData: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
