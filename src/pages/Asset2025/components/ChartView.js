import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from 'faker';
import { da, faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  // bar 粗細
  barPercentage: 0.5,
  plugins: {
    // 圖例
    legend: {
      //   position: "top",
      position: "bottom",
    },
    title: {
      display: true,
      text: "資產表",
    },
  },
};

export default function index({ data }) {
//   data = data.sort((a, b) => (a.date < b.date ? -1 : 1));

  // 取出每個日期當做標籤
  const labels = data.map((obj) => obj.date);
  const rows = data.map((obj) => obj.sum);

  const chartData = {
    labels,
    // 資料集
    datasets: [
      {
        label: "資產",
        // 資料(每個標籤對應一個數字)
        data: rows,
        // data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      //   {
      //     label: "支出",
      //     data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
      //     backgroundColor: "rgba(53, 162, 235, 0.5)",
      //   },
    ],
  };

  //   console.log(labels);
  return <Bar options={options} data={chartData} />;
}
