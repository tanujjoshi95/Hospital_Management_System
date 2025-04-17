import "react";
import WidgetWrapper from "./WidgetWrapper";
import { Responsive, WidthProvider } from "react-grid-layout";
import Table from "./components/Table";
import Notes from "./components/Notes";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import AppointmentsChart from "./components/AppointmentsChart";
import EventTable from "./components/EventTable";
// import EventCalendar from "./components/EventCalender";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const layouts = {
    config: [
      { i: "chart", x: 0, y: 0, w: 10, h: 7 },
      { i: "table", x: 10, y: 0, w: 10, h: 7 },
      { i: "notes", x: 0, y: 7, w: 10, h: 7 },
      { i: "calender", x: 10, y: 7, w: 10, h: 7 },
    ],
  };

  return (
    <div className="flex flex-col h-full w-full overflow-auto">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ config: 0 }}
        cols={{ config: 20 }}
        rowHeight={50}
        isDraggable={true}
        draggableCancel=".non-dragable"
        isResizable={false}
        margin={[16, 16]}
      >
        <div key="chart">
          <WidgetWrapper title="chart">
            <AppointmentsChart />
          </WidgetWrapper>
        </div>
        <div key="notes">
          <WidgetWrapper title="Notes">
            <Notes />
          </WidgetWrapper>
        </div>
        <div key="table">
          <WidgetWrapper title="Data Table">
            <Table />
          </WidgetWrapper>
        </div>
        <div key="calender">
          <WidgetWrapper title="Events">
            <EventTable />
          </WidgetWrapper>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
