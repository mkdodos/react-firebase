import React from "react";
import { da, faker } from "@faker-js/faker";
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
      // 用特定鍵值代表角色分數
      gov: "100",
      middle: "80",
      cap: "300",
      labor: "60",
    },
    {
      player: "B",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "18",
      cap: "3",
      labor: "6",
    },
    {
      player: "C",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "80",
      cap: "30",
      labor: "6",
    },
    {
      player: "D",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "8",
      cap: "30",
      labor: "6",
    },
  ];

  // 日期群組
  const dates = Object.groupBy(data, ({ date }) => date);
  // console.log(Object.keys(dates));

  const getScore = (date, player, role) => {
    // console.log(date);
    // const score = data.find((obj) => obj.player == player && obj.role == role);
    //  const score = data.find((obj) => obj.date == date);
    const score = data.find(
      (obj) => obj.date == date && obj.player == player && obj.role == role
    );

    // console.log(score);

    if (score) {
      // console.log(score);
      // console.log(date, player, role)
      return score.score;
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
      // console.log(index)
      // console.log(scores[index]);

      // 角色迴圈
      roles.map((role) => {
        console.log(player, role);
        console.log(scores[index][role]);
        // scores[index][role] = getScore("2025-09-22", player, role);
        if (scores[index][role] == 0)
          scores[index][role] = getScore(date, player, role);
        // scores[index][role] = getScore("2025-09-22", "A", "middle");
        // scores[index][role] = getScore("2025-09-22", "B", "labor");
        // scores[index][role] = getScore("2025-09-22", "C", "gov");
        // scores[index][role] = getScore("2025-09-22", "D", "cap");
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
            {roles.map((role) => {
              return (
                <TableHeaderCell key={uuidv4()} className={role}>
                  {role}
                </TableHeaderCell>
              );
            })}
            {/* <TableHeaderCell className="labor">勞工</TableHeaderCell>
            <TableHeaderCell className="cap">資本</TableHeaderCell>
            <TableHeaderCell className="middle">中產</TableHeaderCell>
            <TableHeaderCell className="gov">政府</TableHeaderCell> */}
            <TableHeaderCell>合計</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {scores.map((obj) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{obj.player}</TableCell>

                {roles.map((role) => {
                  return <TableCell key={uuidv4()}>{obj[role]}</TableCell>;
                })}

                {/* <TableCell>{obj.labor}</TableCell>
                <TableCell>{obj.middle}</TableCell>
                <TableCell>{obj.cap}</TableCell>
                <TableCell>{obj.gov}</TableCell> */}
                <TableCell>{obj.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
