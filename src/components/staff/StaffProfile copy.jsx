// components/staff/StaffProfile.jsx
import "react";
import ProfileSection from "./ProfileSection";
import InfoRow from "./InfoRow";
import ProfilePicture from "./ProfilePicture";
import mockStaff from "../../database/mockData";

const StaffProfile = () => {
  const staff = mockStaff;

  return (
    <div className="overflow-auto">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl">
        <ProfilePicture staff={staff} />

        <ProfileSection title="Basic Information">
          <InfoRow
            label="Name"
            value={`${staff.firstName} ${staff.lastName}`}
          />
          <InfoRow label="Role" value={staff.role} />
          <InfoRow label="Gender" value={staff.gender} />
          <InfoRow label="Date of Birth" value={staff.dob} />
          <InfoRow label="Contact" value={staff.contactNumber} />
          <InfoRow label="Email" value={staff.email} />
          <InfoRow label="Staff ID" value={staff.staffID} />
        </ProfileSection>

        <ProfileSection title="Work Information">
          <InfoRow label="Department" value={staff.department} />
          <InfoRow label="Designation" value={staff.designation} />
          <InfoRow label="Shift Timings" value={staff.shiftTimings} />
          <InfoRow label="Joining Date" value={staff.joiningDate} />
          <InfoRow label="Status" value={staff.employeeStatus} />
        </ProfileSection>

        <ProfileSection title="Education & Certifications">
          <InfoRow label="Education" value={staff.education.join(", ")} />
          <InfoRow
            label="Certifications"
            value={staff.certifications.join(", ")}
          />
          {staff.role === "Doctor" && (
            <InfoRow
              label="Specializations"
              value={staff.specializations.join(", ")}
            />
          )}
        </ProfileSection>

        <ProfileSection title="Address">
          <InfoRow label="Address Line 1" value={staff.address.addressLine1} />
          <InfoRow label="Address Line 2" value={staff.address.addressLine2} />
          <InfoRow label="City" value={staff.address.city} />
          <InfoRow label="State" value={staff.address.state} />
          <InfoRow label="Postal Code" value={staff.address.postalCode} />
          <InfoRow label="Country" value={staff.address.country} />
        </ProfileSection>

        <p className="text-sm text-right text-gray-500 mt-4">
          Last Updated: {staff.lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default StaffProfile;
