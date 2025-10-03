import { Line } from "react-chartjs-2";

export default function LineView({ state }) {
  //   const options = [];

  console.log(state.scores);

  //   console.log(state.data);
  console.log(state.roles);
  //
  // 每一組長條的標籤
  const labels = ["馬克", "宜君", "愷軒", "欣妤"];

  // 用人員從 data 中找出該角色
  // 準備 4 組資料分別代表不同角色
  const datasets = [];

  const getScore = (role) => {
    let temp = []
    const d = state.data.filter((obj) => obj.role == role); 
    d.map(dd=>temp.push(dd.score))
    console.log(d)
    return temp
    //  console.log(role)
    // return state.data.filter((obj) => obj.role == role);
  };


  const colors = ["#dc143c","rgba(53, 162, 235, 0.5)","#FCB53B","#84994F"]

  state.roles.map((role,i) => {
    datasets.push({
      label: role.name,
      // 取得該角色的分數
      //   data: [0, 82, 137, 60],
      data: getScore(role.id),
      borderColor: colors[i],
    });
  });

  

  //   labels.map((player) => {
  //     datasets.push({
  //       label: "勞工",
  //       data: [0, 82, 137, 60],
  //       borderColor: "#dc143c",
  //     });
  //   });

  // 圖表設定
  const options = {
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

  const data = {
    labels,
    // 資料集
    datasets,
    // datasets: [
    //   {
    //     label: "勞工",
    //     data: [0, 82, 137, 60],
    //     borderColor: "#dc143c",
    //   },
    //   {
    //     label: "資本",
    //     data: labels.map(() => Math.random() * 100),
    //     borderColor: "rgba(53, 162, 235, 0.5)",
    //   },
    //   {
    //     label: "中產",
    //     data: labels.map(() => Math.random() * 100),
    //     borderColor: "#FCB53B",
    //   },
    // ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
