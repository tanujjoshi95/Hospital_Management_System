import { useState, useEffect } from "react";
import ProfilePicture from "../profile/ProfilePicture";
import ProfileSection from "../profile/ProfileSection";
import InfoRow from "../profile/InfoRow";
import { getPatientDetails } from "../../data/server";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        // For demo purposes, we're using a hardcoded patient ID
        // In a real app, this would come from authentication or route params
        const patientData = await getPatientDetails("PAT123456");
        setPatient(patientData);
        setError(null);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to load patient profile");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading patient profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (!patient) {
    return <div className="p-4 text-center">No patient data found</div>;
  }

  return (
    <div className="section-profile w-full px-8 mx-6 pt-8 overflow-auto">
      <ProfilePicture object={patient} />

      <ProfileSection title="Basic Information">
        <InfoRow
          label="Name"
          value={`${patient.firstName} ${patient.lastName}`}
        />
        <InfoRow label="Gender" value={patient.gender} />
        <InfoRow label="Date of Birth" value={patient.dob} />
        <InfoRow label="Contact" value={patient.contactNumber} />
        <InfoRow label="Email" value={patient.email} />
      </ProfileSection>

      <ProfileSection title="Address">
        <InfoRow
          label="Address Line 1"
          value={patient.address?.addressLine1 || "N/A"}
        />
        <InfoRow
          label="Address Line 2"
          value={patient.address?.addressLine2 || "N/A"}
        />
        <InfoRow label="City" value={patient.address?.city || "N/A"} />
        <InfoRow label="State" value={patient.address?.state || "N/A"} />
        <InfoRow
          label="Postal Code"
          value={patient.address?.postalCode || "N/A"}
        />
        <InfoRow label="Country" value={patient.address?.country || "N/A"} />
      </ProfileSection>

      <ProfileSection title="Medical Information">
        <InfoRow
          label="Blood Group"
          value={patient.medicalInformation?.bloodGroup || "N/A"}
        />
        <InfoRow
          label="allergies"
          value={patient.medicalInformation?.allergies || "N/A"}
        />
        <InfoRow
          label="Physician"
          value={patient.medicalInformation?.primaryCarePhysician || "N/A"}
        />
      </ProfileSection>

      <ProfileSection title="Emergency Contact">
        <InfoRow
          label="Name"
          value={patient.emergencyContact?.emergencyContactName || "N/A"}
        />
        <InfoRow
          label="Contact"
          value={patient.emergencyContact?.emergencyContactNumber || "N/A"}
        />
        <InfoRow
          label="Relationship"
          value={patient.emergencyContact?.relationship || "N/A"}
        />
      </ProfileSection>

      <p className="text-sm text-right text-gray-500 mt-4">
        Date of Registration: {patient.registrationDate || "N/A"}
      </p>
    </div>
  );
};

export default PatientProfile;
