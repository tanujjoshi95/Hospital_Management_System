import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiagnosisForm from "./DiagnosisForm";
import { getAppointmentForDiagnosis } from "../../data/server";

const DiagnosisLoader = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const diagnosisData = await getAppointmentForDiagnosis(id);
        setData(diagnosisData);
        setError(null);
      } catch (err) {
        console.error("Error loading diagnosis data:", err);
        setError(err.message || "Failed to load appointment data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <div className="p-4 text-center">Loading diagnosis data...</div>;

  if (error)
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error: {error}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <DiagnosisForm
      patientData={data.patient}
      doctorData={data.doctor}
      appointmentData={data.appointment}
    />
  );
};

export default DiagnosisLoader;
