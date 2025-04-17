import "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AppointmentsChart = () => {
  // Dummy data for the chart
  const data = {
    labels: ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
    datasets: [
      {
        label: "no. of appointments",
        data: [5, 1, 1, 0, 1, 0, 4, 0, 0, 2],
        backgroundColor: "#fff",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "patients",
        data: [0, 2, 1, 0, 5, 0, 3, 0, 1, 0],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Daily Appointements",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "number of appointements",
        },
      },
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
    },
  };

  useEffect(() => {
    // Update the chart data when the component mounts
    const chartElement = document.getElementById("chart");
    if (chartElement) {
      const chartInstance = chartElement.__chartInstance;
      if (chartInstance) {
        chartInstance.data = data;
        chartInstance.update();
      }
    }
    // Cleanup the chart instance when the component unmounts
    return () => {
      if (chartElement) {
        const chartInstance = chartElement.__chartInstance;
        if (chartInstance) {
          chartInstance.destroy();
        }
      }
    };
  });

  return (
    <div
      //   style={styles.chartContainer}
      className=" bg-white rounded-[8px] p-[20px] max-w-[700px] my-2 mx-auto"
    >
      <h2 className="text-2xl mb-3.5 text-[#333] text-center">
        Daily Overview
      </h2>
      <div className="h-72">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AppointmentsChart;
