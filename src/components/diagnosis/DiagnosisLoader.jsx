import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiagnosisForm from "./DiagnosisForm";
import { getPatientById } from "../../database/mockPatients";
import { getAppointementById } from "../../database/mockAppointement";
import { getStaffById } from "../../utility/api";

const DiagnosisLoader = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetch
    const fetchData = async () => {
      const appointment = await getAppointementById(id);
      const patient = await getPatientById(appointment.patientID);
      const doctor = await getStaffById(appointment.doctorID);
      setData({ patient, doctor, appointment });
    };
    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <DiagnosisForm
      patientData={data.patient}
      doctorData={data.doctor}
      appointmentData={data.appointment}
    />
  );
};

export default DiagnosisLoader;
