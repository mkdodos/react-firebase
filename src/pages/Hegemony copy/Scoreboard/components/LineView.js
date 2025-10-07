import { Line } from "react-chartjs-2";

export default function LineView({ state }) {
  // 每一組長條的標籤
  //   const roles = [];

  //   state.roles.map((role) => {
  //     roles.push(role.id);
  //   });
      console.log(state.data);

  const roles = ["勞工", "中產", "資本", "政府"];
   const rolesID = ["A", "B", "C", "D"];

  const players = ["馬克", "宜君", "愷軒", "欣妤"];
  const playersID = ["A", "B", "C", "D"];

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
    const d = state.data.filter((obj) => obj.roleText == role);
    d.sort((a, b) => (a.player > b.player ? 1 : -1));
    console.log(d);

    playersID.map((p) => {
      const s = d.find((ddd) => ddd.player == p);
      if (s) {
        temp.push(s.score);
      } else {
        temp.push(0);
      }
    });
    // d.map((dd) => temp.push(dd.score));
    // console.log(d);
    return temp;
  };

  const colors = ["#dc143c", "#FCB53B","rgba(53, 162, 235, 0.5)",  "gray"];

  roles.map((role, i) => {
    datasets.push({
      label: role,
      // 取得該角色的分數
      //   data: [0, 82, 137, 60],
      data: getScore(role),
      borderColor: colors[i],
    });
  });

  const data = {
    labels: players,
    datasets,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}
