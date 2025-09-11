import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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

export default function index({ data, mortgage }) {
  // 取出每個日期當做標籤
  const labels = data.map((obj) => obj.date);
  const rows = data.map((obj) => obj.sum);   

  // 房貸依日期分組
  const groupedMortgage = Object.groupBy(mortgage, (row) => row.date);
  // 組別陣列
  const groups = Object.keys(groupedMortgage); 
  // 組別迴圏
  const arraySum = [];
  groups.map((g) => {    
    // 同一日期金額加總
    let sum = 0;
    groupedMortgage[g].map((obj) => (sum += Number(obj.balance)));
    arraySum.push(sum);
  }); 

  const chartData = {
    labels,
    // 資料集
    datasets: [
      {
        label: "資產",
        // 資料(每個標籤對應一個數字)
        data: rows,
        borderColor: "rgb(255, 99, 132)",
        // data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "房貸",
        borderColor: "rgb(53, 162, 235)",
        data: arraySum,
        // data: labels.map(() =>
        //   faker.number.int({ min: 1000000, max: 2000000 })
        // ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
