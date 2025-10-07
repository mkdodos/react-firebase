import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "semantic-ui-react";

export default function ScoreBoard() {
  // 多筆資料
  const data = [
    {
      date: "2025-09-22",
      player: "A",
      role: "middle",
      score: 10,
    },
    {
      date: "2025-09-23",
      player: "A",
      role: "labor",
      score: 20,
    },
    {
      date: "2025-09-24",
      player: "A",
      role: "gov",
      score: 30,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "labor",
      score: 100,
    },
    {
      date: "2025-09-22",
      player: "C",
      role: "gov",
      score: "20",
    },
    {
      date: "2025-09-22",
      player: "D",
      role: "cap",
      score: "30",
    },
  ];

  // 某日玩家分數記錄
  const scores = [
    {
      player: "A",
    },
    {
      player: "B",
    },
    {
      player: "C",
    },
    {
      player: "D",
    },
  ];

  // 日期群組
  const dates = Object.groupBy(data, ({ date }) => date);

  const getScore = (date, player, role) => {
    const obj = data.find(
      (obj) => obj.date == date && obj.player == player && obj.role == role
    );

    if (obj) {
      return obj.score;
    }
    return 0;
  };

  const players = ["A", "B", "C", "D"];
  // const players = ["馬克", "宜君", "愷軒", "欣妤"];
  // const roles = ["勞工", "資本", "中產", "政府"];
  const roles = ["gov", "cap", "middle", "labor"];

  // 日期迴圈
  Object.keys(dates).map((date) => {
    // 用日期人員角色取得分數
    // 人員迴圏
    players.map((player) => {
      const index = scores.findIndex((row) => row.player == player);

      // 角色迴圈
      roles.map((role) => {
        console.log(player, role);
        console.log(scores[index][role]);
        // 原本鍵值為空,就取得分數
        // 之後再跑其他日期就不用再取得,以免傳回 0 覆蓋原來分數
        if (!scores[index][role])
          scores[index][role] = getScore(date, player, role);
      });
    });
  });

  console.log(scores);

  return (
    <div>
      <Table celled unstackable>
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map((role) => {
              return (
                <TableHeaderCell key={uuidv4()} className={role}>
                  {role}
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data
            .sort((a, b) => (a.date > b.date ? 1 : -1))
            .map((obj) => {
              return (
                <TableRow key={uuidv4()}>
                  {Object.keys(data[0]).map((key) => {
                    return <TableCell key={uuidv4()}>{obj[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Table celled unstackable className="scoreboard">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>姓名/角色</TableHeaderCell>
            {/* 角色標題和內容都需用迴圈,相同順序才能正確顯示對應分數 */}
            {roles.map((role) => {
              return (
                <TableHeaderCell key={uuidv4()} className={role}>
                  {role}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell>合計</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {scores.map((obj) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{obj.player}</TableCell>
                {/* 角色標題和內容都需用迴圈,相同順序才能正確顯示對應分數 */}
                {roles.map((role) => {
                  return <TableCell key={uuidv4()}>{obj[role]}</TableCell>;
                })}
                <TableCell>{obj.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
