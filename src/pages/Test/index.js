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
import { faker } from '@faker-js/faker';

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
  plugins: {
    // 圖例
    legend: {
    //   position: "top",
      position: "bottom",
    },
    title: {
      display: true,
      text: "收支表",
    },
  },
};

const labels = ["一月", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  // 資料集
  datasets: [
    {
      label: "收入",
      // 資料(每個標籤對應一個數字)    
      data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "支出",
      data: labels.map(() => faker.number.int({ min: 1, max: 100 })),    
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function index() {
  return <Bar options={options} data={data} />;
}
