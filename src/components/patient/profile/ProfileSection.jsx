// components/staff/ProfileSection.jsx
import "react";
import PropTypes from "prop-types";

const ProfileSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 border-b pb-1">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3  gap-6">{children}</div>
    </div>
  );
};

export default ProfileSection;

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
