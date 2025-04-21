import "react";
import {
  Calendar,
  Clock,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import BookAppointment from "./BookAppointment";
import { getAllAppointments, getStaffDetails } from "../../data/server";
// import { useNavigate } from "react-router-dom";

const AppointmentsList = () => {
  // const navigate = useNavigate();
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorNames, setDoctorNames] = useState({});
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  const handleNewAppointement = () => {
    setOpenAppointmentForm(true); // Open the appointment form modal
  };

  const onClose = () => {
    setOpenAppointmentForm(false);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await getAllAppointments();
        setAppointments(response);

        // Fetch doctor names for all appointments
        const uniqueDoctorIds = [
          ...new Set(response.map((app) => app.doctorID)),
        ];
        const doctorData = {};

        for (const doctorId of uniqueDoctorIds) {
          try {
            const doctor = await getStaffDetails(doctorId);
            doctorData[doctorId] = `Dr. ${doctor.firstName} ${doctor.lastName}`;
          } catch (err) {
            console.error(
              `Error fetching doctor details for ID ${doctorId}:`,
              err
            );
            doctorData[doctorId] = "Unknown Doctor";
          }
        }

        setDoctorNames(doctorData);
        setError(null);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [openAppointmentForm]); // Refresh when appointment form closes

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-100";
      case "Scheduled":
        return "text-blue-700 bg-blue-100";
      case "Cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter upcoming appointments (today or future dates with status "Scheduled")
  const upcomingAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today
      return appointmentDate >= today && appointment.status === "Scheduled";
    })
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  // Get the appointments to display based on the showAllAppointments state
  const displayedAppointments = showAllAppointments
    ? appointments.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      )
    : upcomingAppointments.slice(0, 3); // Show only the next 3 upcoming appointments

  const toggleShowAllAppointments = () => {
    setShowAllAppointments(!showAllAppointments);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading appointments...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 overflow-auto">
      {!openAppointmentForm && (
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
                    {showAllAppointments
                      ? "All Appointments"
                      : "Upcoming Appointments"}
                  </h2>
                  <p className="text-gray-600">
                    {showAllAppointments
                      ? "Showing all your appointment records."
                      : "Showing your upcoming appointments."}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleNewAppointement}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create New Appointment
                  </button>
                </div>
              </div>

              {displayedAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {showAllAppointments
                    ? "No appointments found"
                    : "No upcoming appointments found"}
                </div>
              ) : (
                <div className="grid gap-4">
                  {displayedAppointments.map((appointment) => (
                    <div
                      key={appointment.appointmentID}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <h3 className="font-medium text-gray-900">
                              {doctorNames[appointment.doctorID] ||
                                "Loading doctor..."}
                            </h3>
                          </div>
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm text-gray-500">
                              {formatDate(appointment.appointmentDate)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <p className="text-sm text-gray-500">
                              {appointment.appointmentTime} (
                              {appointment.duration} min)
                            </p>
                          </div>
                        </div>

                        <div className="flex-1 mx-4">
                          <div className="flex items-center mb-1">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            <h3 className="font-medium text-gray-900">
                              {appointment.type}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {appointment.notes || "No notes available"}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={toggleShowAllAppointments}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {showAllAppointments ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      View All Appointments
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openAppointmentForm && <BookAppointment onCLose={onClose} />}
    </div>
  );
};

export default AppointmentsList;
