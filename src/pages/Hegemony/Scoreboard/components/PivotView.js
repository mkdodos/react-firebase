import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

export default function PivotView({ data }) {
  console.log(data);

  // 列(玩家)
  const players = ["馬克", "宜君", "愷軒", "欣妤"];
  // 欄(角色)
  const roles = [
    { id: "labor", name: "勞工" },
    { id: "middle", name: "中產" },
    { id: "cap", name: "資本" },
    { id: "gov", name: "政府" },
  ];

  // 玩家資料
  //   const players = ["A", "B", "C", "D"];

  // 用 玩家名字和角色取得分數
  const getScore = (player, role) => {
    const scoreObj = data.find(
      (obj) => obj.playerText == player && obj.role == role
    );
    let score = 0;
    if (scoreObj) {
      score = scoreObj.score;
    }

    return score;
  };

  // 個人總分
  const getPlayerScore = (player) => {
    const scoreArray = data.filter((obj) => obj.playerText == player);
    let score = 0;
    scoreArray.map((obj) => (score += Number(obj.score)));
    return score;
  };

  // 角色總分
  const getRoleScore = (role) => {
    const scoreArray = data.filter((obj) => obj.role == role);
    let score = 0;   
    scoreArray.map((obj) => {
      score += Number(obj.score);
    });
    // 避免出現陣列長度 NaN (Not-A-Number) 無法計算
    if (scoreArray.length > 0) {
      return Math.round(score / scoreArray.length);
    }
  };

  return (
    <div>
      <Table celled unstackable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>姓名/角色</TableHeaderCell>
            {roles.map((role) => {
              return (
                <TableHeaderCell key={uuidv4()} className={role.id}>
                  {role.name}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell>個人總分</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{player}</TableCell>

                {roles.map((role) => {
                  return (
                    <TableCell key={uuidv4()}>
                      {getScore(player, role.id)}
                    </TableCell>
                  );
                })}
                <TableCell>{getPlayerScore(player)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          {/* 角色分數合計列 */}
          <TableRow>
            <TableHeaderCell>角色平均</TableHeaderCell>
            {roles.map((role) => {
              return (
                <TableHeaderCell key={uuidv4()}>
                  {getRoleScore(role.id)}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
