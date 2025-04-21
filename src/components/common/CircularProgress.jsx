import PropTypes from "prop-types";

const CircularProgress = ({ progress }) => {
  const getQuarterClasses = (index) => {
    if (progress >= (index + 1) * 25) return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <div className="relative w-40 h-40">
      {/* Base Circle */}
      <div className="absolute inset-0 w-full h-full rounded-full border-8 border-gray-200"></div>

      {/* Quarter Segments */}
      <div
        className={`absolute top-0 left-1/2 w-1/2 h-1/2 rounded-tr-full transform origin-bottom-left ${getQuarterClasses(
          0
        )}`}
      ></div>
      <div
        className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-tl-full transform origin-bottom-right ${getQuarterClasses(
          1
        )}`}
      ></div>
      <div
        className={`absolute bottom-0 right-1/2 w-1/2 h-1/2 rounded-bl-full transform origin-top-right ${getQuarterClasses(
          2
        )}`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-1/2 h-1/2 rounded-br-full transform origin-top-left ${getQuarterClasses(
          3
        )}`}
      ></div>

      {/* Center Circle (for text display) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{progress}%</span>
      </div>
    </div>
  );
};
export default CircularProgress;
CircularProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};
