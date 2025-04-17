// MedicalRecords.jsx
import { useState, useEffect } from "react";
import MedicalRecordDetails from "./MedicalRecordDetails";

import PropTypes from "prop-types";
import { Calendar } from "lucide-react";

const MedicalRecords = ({ patientId }) => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  // const test = {
  //   id: "rec1",
  //   date: "2025-04-10",
  //   doctor: "Dr. Smith",
  //   diagnosis: "Flu",
  //   condition: "Normal",
  //   prescription: "Paracetamol + Rest",
  //   notes: "Follow up in 3 days",
  // };

  useEffect(() => {
    // TODO: Replace with actual fetch from backend
    const dummyRecords = [
      {
        id: "rec1",
        date: "2025-04-10",
        doctor: "Dr. Smith",
        diagnosis: "Flu",
        condition: "Normal",
        prescription: "Paracetamol + Rest",
        notes: "Follow up in 3 days",
      },
      {
        id: "rec2",
        date: "2025-04-15",
        doctor: "Dr. Johnson",
        diagnosis: "Headache",
        condition: "Mild",
        prescription: "Ibuprofen + Acetaminophen",
        notes: "Follow up in 2 days",
      },
      {
        id: "rec3",
        date: "2025-04-20",
        doctor: "Dr. Brown",
        diagnosis: "Stomachache",
        condition: "Severe",
        prescription: "Aspirin + Ibuprofen",
        notes: "Follow up in 1 day",
      },
    ];
    setRecords(dummyRecords);
  }, [patientId]);

  function setConditionColor(condition) {
    if (condition === "Normal") {
      return "text-green-600 bg-green-100";
    } else if (condition === "Mild") {
      return "text-yellow-600 bg-yellow-100";
    } else if (condition === "Severe") {
      return "text-red-600 bg-red-100";
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Medical Records</h2>
      <div className="bg-white shadow rounded-xl p-4">
        {records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-6">
                <div className="border-b pb-4 flex flex-row justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Recent Appointments
                    </h2>
                    <p className="text-gray-600">
                      Your Appointments records will be displayed here.
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Create New Appointment
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Recent Appointments
                    </h2>
                  </div>
                  {/* Recent Appointments */}
                  {records.map((record, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-500">{record.date}</p>

                        <h3 className="font-medium text-gray-900">
                          {record.doctor}
                        </h3>
                        <h3 className="font-medium text-gray-900">
                          {record.diagnosis}
                        </h3>

                        <span
                          className={`px-2 py-1 text-xs font-medium ${setConditionColor(
                            record.condition
                          )} rounded-full`}
                        >
                          {record.condition}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <table className="w-full text-left border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Doctor</th>
                      <th className="p-2">Diagnosis</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-t">
                        <td className="p-2">{rec.date}</td>
                        <td className="p-2">{rec.doctor}</td>
                        <td className="p-2">{rec.diagnosis}</td>
                        <td className="p-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => setSelectedRecord(rec)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Request All Apoointments
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedRecord && (
        <MedicalRecordDetails
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};

export default MedicalRecords;
MedicalRecords.propTypes = {
  patientId: PropTypes.string.isRequired,
};
