// MedicalRecordDetails.jsx

import PropTypes from "prop-types";

const MedicalRecordDetails = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-xl">
        <h3 className="text-xl font-bold mb-4">Medical Record Details</h3>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>Date:</strong> {record.date}
          </p>
          <p>
            <strong>Doctor:</strong> {record.doctor}
          </p>
          <p>
            <strong>Diagnosis:</strong> {record.diagnosis}
          </p>
          <p>
            <strong>Prescription:</strong> {record.prescription}
          </p>
          <p>
            <strong>Notes:</strong> {record.notes}
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;
MedicalRecordDetails.propTypes = {
  record: PropTypes.shape({
    date: PropTypes.string.isRequired,
    doctor: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
    prescription: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
