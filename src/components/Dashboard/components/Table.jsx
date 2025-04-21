import { useEffect, useState } from "react";
import { apiGetAllAppointments } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDiagnosisLoader = (appointment) => {
    // Handle diagnosis loader logic here
    // For example, you can redirect to the diagnosis page
    console.log(appointment);
    navigate(`/appointment/${appointment.appointmentID}/diagnosis`);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await apiGetAllAppointments();

        // Fix response structure handling
        const appointmentsData =
          response.data?.appointments || response.appointments || [];

        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter for upcoming appointments (today or future with status "Scheduled")
        const upcomingAppointments = appointmentsData
          .filter((appointment) => {
            const appointmentDate = new Date(appointment.appointmentDate);
            return (
              appointmentDate >= today && appointment.status === "Scheduled"
            );
          })
          .sort(
            (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
          );

        // Process appointments to include patient name from patientID if needed
        const processedAppointments = upcomingAppointments.map(
          (appointment) => ({
            ...appointment,
            // Format date and time for display if needed
            date: appointment.appointmentDate,
            time: appointment.appointmentTime,
          })
        );

        setAppointments(processedAppointments);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Rest of the component remains unchanged
  if (loading) {
    return <div className="p-4 text-center">Loading appointments...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div style={{ padding: "15px", height: "100%", overflow: "auto" }}>
      {appointments.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No upcoming appointments found
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.appointmentID}
            onClick={(e) => {
              e.preventDefault();
              handleDiagnosisLoader(appointment);
            }}
            className="non-dragable p-4 my-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">
                  {appointment.patientName ||
                    `Patient ID: ${appointment.patientID}`}
                </h3>
                <p className="text-sm text-gray-500">{appointment.patientID}</p>
              </div>
              <div className="flex flex-col text-center">
                <span className="px-2 py-1 font-medium text-gray-900">
                  {appointment.time}
                </span>
                <p className="text-sm text-gray-500">{appointment.date}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === "Completed"
                    ? "text-green-700 bg-green-100"
                    : appointment.status === "Scheduled"
                    ? "text-blue-700 bg-blue-100"
                    : appointment.status === "Cancelled"
                    ? "text-red-700 bg-red-100"
                    : "text-gray-700 bg-gray-100"
                }`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Table;
