// MedicalRecords.jsx
import { useState, useEffect } from "react";
import MedicalRecordDetails from "./MedicalRecordDetails";
import {
  getMedicalRecords,
  getAllMedicalRecords,
  getPatientDetails,
} from "../../data/server";
import PropTypes from "prop-types";
import {
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  User,
  Search,
} from "lucide-react";

const MedicalRecords = ({ userId, userType }) => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        let data = [];

        // If staff user, fetch all medical records
        if (userType === "staff" || userType === "admin") {
          data = await getAllMedicalRecords();
        }
        // If patient user, fetch only their records
        else if (userType === "patient") {
          data = await getMedicalRecords(userId);
          // Also fetch patient details
          const patientData = await getPatientDetails(userId);
          setPatientInfo(patientData);
        }

        // Sort records by date (newest first)
        const sortedRecords = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRecords(sortedRecords);
        setError(null);
      } catch (err) {
        console.error("Error fetching medical records:", err);
        setError("Failed to load medical records");

        // Fallback to dummy data for demo purposes
        const dummyRecords =
          userType === "staff"
            ? [
                {
                  id: "rec1",
                  patientId: "PAT123456",
                  patientName: "John Doe",
                  date: "2025-04-10",
                  doctor: "Dr. Smith",
                  diagnosis: "Flu",
                  condition: "Normal",
                  prescription: "Paracetamol + Rest",
                  notes: "Follow up in 3 days",
                },
                {
                  id: "rec2",
                  patientId: "PAT789012",
                  patientName: "Sarah Williams",
                  date: "2025-04-15",
                  doctor: "Dr. Johnson",
                  diagnosis: "Headache",
                  condition: "Mild",
                  prescription: "Ibuprofen + Acetaminophen",
                  notes: "Follow up in 2 days",
                },
                {
                  id: "rec3",
                  patientId: "PAT345678",
                  patientName: "Michael Johnson",
                  date: "2025-04-20",
                  doctor: "Dr. Brown",
                  diagnosis: "Stomachache",
                  condition: "Severe",
                  prescription: "Aspirin + Ibuprofen",
                  notes: "Follow up in 1 day",
                },
              ]
            : [
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
              ];
        setRecords(dummyRecords);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [userId, userType]);

  const toggleShowAllRecords = () => {
    setShowAllRecords(!showAllRecords);
  };

  // Filter records based on search term (for staff view)
  const filteredRecords =
    userType === "staff" && searchTerm
      ? records.filter(
          (record) =>
            (record.patientName &&
              record.patientName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (record.patientId &&
              record.patientId
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (record.diagnosis &&
              record.diagnosis
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) ||
            (record.doctor &&
              record.doctor.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : records;

  // Get the records to display based on the showAllRecords state
  const displayedRecords = showAllRecords
    ? filteredRecords
    : filteredRecords.slice(0, 3);

  function setConditionColor(condition) {
    if (condition === "Normal") {
      return "text-green-600 bg-green-100";
    } else if (condition === "Mild") {
      return "text-yellow-600 bg-yellow-100";
    } else if (condition === "Severe") {
      return "text-red-600 bg-red-100";
    }
    return "text-gray-600 bg-gray-100";
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading medical records...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {userType === "staff"
                    ? "All Patients Medical Records"
                    : patientInfo
                    ? `Medical Records for ${patientInfo.firstName} ${patientInfo.lastName}`
                    : "Your Medical Records"}
                </h2>
                <p className="text-gray-600">
                  {userType === "staff"
                    ? "View and manage medical records for all patients."
                    : "View your medical history and treatment records."}
                </p>
              </div>

              {userType === "staff" && (
                <div className="mt-4 md:mt-0 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search records..."
                      className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {userType === "staff"
                  ? searchTerm
                    ? "No medical records found matching your search criteria."
                    : "No medical records found in the system."
                  : "No medical records found for your account."}
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {displayedRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedRecord(record)}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formatDate(record.date)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {record.doctor}
                            </p>
                          </div>
                        </div>

                        {userType === "staff" && record.patientName && (
                          <div className="flex items-start gap-2">
                            <User className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {record.patientName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {record.patientId}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="flex-1 md:ml-4">
                          <h3 className="font-medium text-gray-900">
                            {record.diagnosis}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {record.notes}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${setConditionColor(
                              record.condition
                            )}`}
                          >
                            {record.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredRecords.length > 3 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={toggleShowAllRecords}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {showAllRecords ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Show All Records ({filteredRecords.length})
                        </>
                      )}
                    </button>
                  </div>
                )}

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Records Summary
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          {userType === "staff" && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Patient
                            </th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Doctor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Diagnosis
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Condition
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {displayedRecords.map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(record.date)}
                            </td>
                            {userType === "staff" && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {record.patientName || "Unknown"}
                                <div className="text-xs text-gray-500">
                                  {record.patientId}
                                </div>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.doctor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.diagnosis}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${setConditionColor(
                                  record.condition
                                )}`}
                              >
                                {record.condition}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <button
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                onClick={() => setSelectedRecord(record)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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
  userId: PropTypes.string.isRequired,
  userType: PropTypes.oneOf(["staff", "patient"]).isRequired,
};
