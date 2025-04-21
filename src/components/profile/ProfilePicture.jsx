// components/staff/ProfilePicture.jsx
import "react";

import PropTypes from "prop-types";
import { calculateAge } from "../../utils/calculateAge";

const ProfilePicture = ({ object }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src={object.profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">
          {object.firstName} {object.lastName}
        </h1>
        <p className="text-gray-600">Age: {calculateAge(object.dob)}</p>
      </div>
    </div>
  );
};

export default ProfilePicture;
ProfilePicture.propTypes = {
  object: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
  }).isRequired,
};
