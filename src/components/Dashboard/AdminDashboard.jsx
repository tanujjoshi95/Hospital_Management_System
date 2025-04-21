import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import PropTypes from "prop-types";

// Make the grid responsive
const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample dashboard components
const ChartComponent = () => (
  <div style={{ padding: "15px", height: "100%" }}>
    <h3>Chart</h3>
    <div
      style={{
        height: "calc(100% - 50px)",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Chart Content Goes Here
    </div>
  </div>
);

const TableComponent = () => (
  <div style={{ padding: "15px", height: "100%", overflow: "auto" }}>
    <h3>Data Table</h3>
    <table
      style={{
        width: "100%",
        border: "1px solid #ddd",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>1</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Item A</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>$100</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>2</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Item B</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>$200</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>3</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>Item C</td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>$300</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const StatsComponent = () => (
  <div style={{ padding: "15px", height: "100%" }}>
    <h3>Statistics</h3>
    <div style={{ marginBottom: "10px" }}>
      <strong>Total Users:</strong> 1,245
    </div>
    <div style={{ marginBottom: "10px" }}>
      <strong>Active Sessions:</strong> 328
    </div>
    <div style={{ marginBottom: "10px" }}>
      <strong>Average Time:</strong> 15.3 min
    </div>
  </div>
);

const NotesComponent = () => (
  <div style={{ padding: "15px", height: "100%" }}>
    <h3>Notes</h3>
    <textarea
      style={{ width: "100%", height: "calc(100% - 50px)", padding: "8px" }}
      placeholder="Enter your notes here..."
    ></textarea>
  </div>
);

// Component wrapper to add styling
const WidgetWrapper = ({ children, title }) => (
  <div className="h-full w-full bg-white border border-gray-300 rounded-md flex flex-col overflow-hidden">
    <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <span className="font-bold">{title}</span>
      <div>{/* Control buttons could go here */}</div>
    </div>
    <div className="flex-1 overflow-auto">{children}</div>
  </div>
);

// Main Dashboard component
const AdminDashboard = () => {
  // Define the layout for different points
  const layouts = {
    config: [
      { i: "chart", x: 0, y: 0, w: 8, h: 6 },
      { i: "table", x: 0, y: 6, w: 8, h: 6 },
      { i: "stats", x: 8, y: 0, w: 4, h: 6 },
      { i: "notes", x: 8, y: 6, w: 4, h: 6 },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, padding: "16px", overflow: "hidden" }}>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ config: 0 }}
          cols={{ config: 12 }}
          rowHeight={50}
          isDraggable={true}
          isResizable={true}
          resizeHandles={["se", "sw", "ne", "nw", "e", "w", "s", "n"]}
          margin={[16, 16]}
        >
          <div key="chart">
            <WidgetWrapper title="Chart">
              <ChartComponent />
            </WidgetWrapper>
          </div>
          <div key="table">
            <WidgetWrapper title="Data Table">
              <TableComponent />
            </WidgetWrapper>
          </div>
          <div key="stats">
            <WidgetWrapper title="Statistics">
              <StatsComponent />
            </WidgetWrapper>
          </div>
          <div key="notes">
            <WidgetWrapper title="Notes">
              <NotesComponent />
            </WidgetWrapper>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};
WidgetWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdminDashboard;

// For a real application, you would need to install the following dependencies:
// npm install react-grid-layout
