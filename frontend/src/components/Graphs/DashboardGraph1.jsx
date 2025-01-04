import React from "react";
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

// Register the required elements for a bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashBoardGraph1 = ({ graphData }) => {
  console.log(graphData);

  const data = {
    labels: ["Idly", "Dosa", "Bobbara", "Pesara"],
    datasets: [
      {
        label: "Batter Quantities",
        data: [graphData.idly, graphData.dosa, graphData.bobbara, graphData.pesara],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Batter Types",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[250px] text-center items-center flex justify-center shadow-xl rounded-md border w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashBoardGraph1;
