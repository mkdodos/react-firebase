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
  // 將一列一列的資料表格,顯示成欄列對應的表格
  // 欄 : 角色
  // 列 : 玩家
  // 欄列 : 玩家角色分數

  // 原始資料
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
      date: "2025-09-24",
      player: "A",
      role: "cap",
      score: 300,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "labor",
      score: 100,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "gov",
      score: 1000,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "middle",
      score: 1200,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "cap",
      score: 369,
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

  // 玩家分數記錄(準備將原始資料加入)
  // 加入後成為
  // {
  //   "player": "A",
  //   "gov": 30,
  //   "cap": 300,
  //   "middle": 10,
  //   "labor": 20
  // }
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

  // 用玩家和角色取得分數
  const getScore = (player, role) => {
    const obj = data.find((obj) => obj.player == player && obj.role == role);

    if (obj) {
      return obj.score;
    }
    return 0;
  };

  // 玩家資料
  const players = ["A", "B", "C", "D"];
  // 角色資料
  const roles = ["gov", "cap", "middle", "labor"];

  // 用玩家角色取得分數
  // 玩家迴圏
  players.map((player) => {
    // 取得玩家所在列
    const index = scores.findIndex((row) => row.player == player);
    // 角色迴圈
    roles.map((role) => {
      // 設定玩家角色的分數
      scores[index][role] = getScore(player, role);
    });
  });

  return (
    <div>
      <Table celled unstackable>
        <TableHeader>
          <TableRow>
            {/* 以原始資料的第0列鍵值做為標題 */}
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
          {/* 每筆資料以一列一列表格呈現 */}
          {data.map((obj) => {
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

      {/* 欄列對應的表格 */}
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
