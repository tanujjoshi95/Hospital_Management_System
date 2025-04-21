import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getStaffDetails } from "../../data/server";
import ProfileSection from "../profile/ProfileSection";
import InfoRow from "../profile/InfoRow";
import { useUserContext } from "../../contexts/UserContext";

// import AppointmentDetails from "../components/AppointmentDetails";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: staffIdFromUrl } = useParams(); // Get ID from URL params if available
  const { user } = useUserContext(); // Get user from context

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);

        // Determine which ID to use - URL param takes precedence
        const staffId =
          staffIdFromUrl || (user?.role === "staff" ? user.id : "STF001");

        const staffData = await getStaffDetails(staffId);
        setStaff(staffData);
        setError(null);
      } catch (err) {
        console.error("Error fetching staff data:", err);
        setError("Failed to load staff profile");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [staffIdFromUrl, user]);

  if (loading) {
    return <div className="p-4 text-center">Loading staff profile...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (!staff) {
    return <div className="p-4 text-center">No staff data found</div>;
  }

  return (
    <div className="section-profile w-full pt-4 overflow-auto">
      {/* TODO: Import and implement ProfilePicture component */}
      <div className="profile-picture-placeholder">
        <img
          src={staff.profilePicture || "/default-avatar.png"}
          alt={`${staff.firstName} ${staff.lastName}`}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      <ProfileSection title="Basic Information">
        <InfoRow label="Name" value={`${staff.firstName} ${staff.lastName}`} />
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
        <InfoRow
          label="Education"
          value={staff.education?.join(", ") || "N/A"}
        />
        <InfoRow
          label="Certifications"
          value={staff.certifications?.join(", ") || "N/A"}
        />
        {staff.role === "Doctor" && staff.specializations && (
          <InfoRow
            label="Specializations"
            value={staff.specializations.join(", ")}
          />
        )}
      </ProfileSection>

      <ProfileSection title="Address">
        <InfoRow
          label="Address Line 1"
          value={staff.address?.addressLine1 || "N/A"}
        />
        <InfoRow
          label="Address Line 2"
          value={staff.address?.addressLine2 || "N/A"}
        />
        <InfoRow label="City" value={staff.address?.city || "N/A"} />
        <InfoRow label="State" value={staff.address?.state || "N/A"} />
        <InfoRow
          label="Postal Code"
          value={staff.address?.postalCode || "N/A"}
        />
        <InfoRow label="Country" value={staff.address?.country || "N/A"} />
      </ProfileSection>

      <p className="text-sm text-right text-gray-500 mt-4">
        Last Updated: {staff.lastUpdated || "N/A"}
      </p>
    </div>
  );
};

export default StaffProfile;
StaffProfile.propTypes = {
  openCreateAppointementForm: PropTypes.func,
};
