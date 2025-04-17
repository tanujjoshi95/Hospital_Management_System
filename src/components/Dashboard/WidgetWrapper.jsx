import PropTypes from "prop-types";

const WidgetWrapper = ({ children, title }) => (
  <div className="h-full w-full bg-white border border-gray-300 shadow-gray-300 shadow-md rounded-md flex flex-col overflow-hidden">
    <div className="px-4 py-2.5 bg-gray-100 flex justify-between items-center">
      <span className="text-gray-700 text-md font-semibold">{title}</span>
    </div>

    <div className="flex-1 overflow-auto">{children}</div>
  </div>
);
export default WidgetWrapper;

WidgetWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
