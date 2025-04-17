// components/staff/ProfilePicture.jsx
import "react";

import PropTypes from "prop-types";

const ProfilePicture = ({ staff }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={staff.profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">
          {staff.firstName} {staff.lastName}
        </h1>
        <p className="text-gray-600">
          {staff.designation} – {staff.department}
        </p>
      </div>
    </div>
  );
};

export default ProfilePicture;
ProfilePicture.propTypes = {
  staff: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
  }).isRequired,
};
