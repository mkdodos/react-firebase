import {
  Chart as ChartJS, 
  PointElement,
  LineElement, 
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// 註冊所需元件
ChartJS.register( 
  PointElement,
  LineElement,
);


// 圖表設定
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
         borderColor: 'rgb(255, 99, 132)',
        // data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
        {
          label: "負債",
          borderColor: 'rgb(53, 162, 235)',
          data: labels.map(() => faker.number.int({ min: 1000000, max: 2000000 })),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
  };
  
  return <Line options={options} data={chartData} />;
}
