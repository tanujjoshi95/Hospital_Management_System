import { useEffect, useState } from "react";
import { getAppointement } from "../../../database/mockAppointement";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const handleDiagnosisLoader = (appointment) => {
    // Handle diagnosis loader logic here
    // For example, you can redirect to the diagnosis page
    console.log(appointment);
    // navigate(`/appointment/${appointment.appointmentID}/diagnosis`);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getAppointement(); // Replace with your actual API call
      setAppointments(response);
    };
    fetchAppointments();
  }, []);

  return (
    <div style={{ padding: "15px", height: "100%", overflow: "auto" }}>
      {appointments.map((appointment) => (
        <div
          key={appointment.appointmentID}
          onClick={(e) => {
            e.preventDefault();
            handleDiagnosisLoader(appointment);
          }}
          className="non-dragable p-4 my-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {appointment.patientName}
              </h3>
              <p className="text-sm text-gray-500">{appointment.patientID}</p>
            </div>
            <div className="flex flex-col text-center">
              <span className="px-2 py-1 font-medium text-gray-900">
                {appointment.time}
              </span>
              <p className="text-sm text-gray-500">{appointment.date}</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
              {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Table;
