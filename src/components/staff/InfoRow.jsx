// components/staff/InfoRow.jsx
import "react";
import PropTypes from "prop-types";

const InfoRow = ({ label, value }) => {
  if (!label) {
    console.warn("Label prop is required for InfoRow component");
    return null;
  }
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-black font-medium">{value || "Not Provided"}</span>
    </div>
  );
};

export default InfoRow;
InfoRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
