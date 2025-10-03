import { Line } from "react-chartjs-2";

export default function LineView({ state }) {
  // 每一組長條的標籤
  const roles = [];

  state.roles.map((role) => {
    roles.push(role.name);
  });
  //   console.log(roles);

  const players = ["馬克", "宜君", "愷軒", "欣妤"];

  // 圖表設定
  const options = {
    responsive: true,
    plugins: {
      // 圖例
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "收支表",
      },
    },
  };

  const datasets = [];

  const getScore = (role) => {
    let temp = [];
    const d = state.data.filter((obj) => obj.role == role);
    d.sort((a, b) => (a.player > b.player ? 1 : -1));
    console.log(d)
    
    players.map(p=>{
        // const s =
    })
    // d.map((dd) => temp.push(dd.score));
    // console.log(d);
    return temp;
  };

  const colors = ["#dc143c", "rgba(53, 162, 235, 0.5)", "#FCB53B", "#84994F"];

  state.roles.map((role, i) => {
    datasets.push({
      label: role.name,
      // 取得該角色的分數
      //   data: [0, 82, 137, 60],
      data: getScore(role.id),
      borderColor: colors[i],
    });
  });

  const data = {
    labels:players,
    datasets,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
