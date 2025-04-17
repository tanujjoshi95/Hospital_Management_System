// eslint-disable-next-line no-unused-vars
import PropTypes from "prop-types";
import ProfilePicture from "./profile/ProfilePicture";
import ProfileSection from "./profile/ProfileSection";
import InfoRow from "./profile/InfoRow";
import mockPatients from "../../database/mockPatients";

const PatientProfile = () => {
  const patient = mockPatients[0];
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
        <InfoRow label="Address Line 1" value={patient.address.addressLine1} />
        <InfoRow label="Address Line 2" value={patient.address.addressLine2} />
        <InfoRow label="City" value={patient.address.city} />
        <InfoRow label="State" value={patient.address.state} />
        <InfoRow label="Postal Code" value={patient.address.postalCode} />
        <InfoRow label="Country" value={patient.address.country} />
      </ProfileSection>

      <ProfileSection title="Medical Information">
        <InfoRow
          label="Blood Group"
          value={patient.medicalInformation.bloodGroup}
        />
        <InfoRow
          label="allergies"
          value={patient.medicalInformation.allergies}
        />
        <InfoRow
          label="Physician"
          value={patient.medicalInformation.primaryCarePhysician}
        />
      </ProfileSection>

      <ProfileSection title="Emergency Contact">
        <InfoRow
          label="Name"
          value={patient.emergencyContact.emergencyContactName}
        />
        <InfoRow
          label="Contact"
          value={patient.emergencyContact.emergencyContactNumber}
        />
        <InfoRow
          label="Relationship"
          value={patient.emergencyContact.relationship}
        />
      </ProfileSection>

      <p className="text-sm text-right text-gray-500 mt-4">
        Date of Registration: {patient.registrationDate}
      </p>
    </div>
  );
};

export default PatientProfile;
