import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "semantic-ui-react";

import { faker } from "@faker-js/faker";
import "./scoreboard.css";


import { v4 as uuidv4 } from 'uuid';



export default function ScoreBoard() {
  // ui celled unstackable table

  // 單筆資料
  const row = { date: "2025-09-22", player: "Mark", role: "中產", score: 100 };
  const row1 = { date: "2025-09-22", player: "Dada", role: "勞工", score: 80 };

  // 多筆資料
  const data = [
    {
      date: "2025-09-22",
      player: "A",
      role: "中產",
      score: 10,
    },
    {
      date: "2025-09-23",
      player: "A",
      role: "勞工",
      score: 20,
    },
    {
      date: "2025-09-24",
      player: "A",
      role: "政府",
      score: 30,
    },
    {
      date: "2025-09-22",
      player: "B",
      role: "勞工",
      score: faker.number.int({ min: 1, max: 100 }),
    },
    {
      date: "2025-09-22",
      player: "C",
      role: "政府",
      score: faker.number.int({ min: 1, max: 100 }),
    },
    {
      date: "2025-09-22",
      player: "D",
      role: "資本",
      score: faker.number.int({ min: 1, max: 100 }),
    },
  ];

  // 某位玩家所有分數為一列
  // 依玩家群組資料

  //   const playerScores = Object.groupBy(data, ({ player }) => player);
  //   console.log(playerScores.A);

  // 某日玩家分數記錄
  const scores = [
    {
      player: "馬克",
      // 用特定鍵值代表角色分數
      gov: "100",
      middle: "80",
      cap: "300",
      labor: "60",
    },
    {
      player: "宜君",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "18",
      cap: "3",
      labor: "6",
    },
    {
      player: "愷軒",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "80",
      cap: "30",
      labor: "6",
    },
    {
      player: "欣妤",
      // 用特定鍵值代表角色分數
      gov: "10",
      middle: "8",
      cap: "30",
      labor: "6",
    },
  ];

  //   scores[0].total=500

  // 計算單人合計
  const keys = Object.keys(scores[0]);

  let sum = 0;
  keys.map((key) => {
    if (key !== "player") {
      sum += Number(scores[0][key]);
    }
   
  });

   scores[0].total=sum
   console.log(sum);

//   console.log(Object.keys(scores[0]));

  //   const roles = ["勞工", "資本", "中產", "政府"];
  //   const players = ["馬克", "宜君", "愷軒", "欣妤"];

  //   for (let i = 0; i < 4; i++) {
  //     data.push({
  //       date: "2025-09-22",
  //       player: players[i],
  //       role: roles[i],
  //       score: faker.number.int({ min: 1, max: 100 }),
  //     });
  //   }

  //   console.log(data)

  return (
    <div>
      <Table celled unstackable className="scoreboard">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>姓名/角色</TableHeaderCell>
            <TableHeaderCell className="labor">勞工</TableHeaderCell>
            <TableHeaderCell className="cap">資本</TableHeaderCell>
            <TableHeaderCell className="middle">中產</TableHeaderCell>
            <TableHeaderCell className="gov">政府</TableHeaderCell>
            <TableHeaderCell>合計</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {scores.map((obj) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell>{obj.player}</TableCell>
                <TableCell>{obj.labor}</TableCell>
                <TableCell>{obj.middle}</TableCell>
                <TableCell>{obj.cap}</TableCell>
                <TableCell>{obj.gov}</TableCell>
                <TableCell>{obj.total}</TableCell>
              </TableRow>
            );
          })}

          {/* <TableRow>
            <TableCell>{scores[1].player}</TableCell>
            <TableCell>{scores[1].labor}</TableCell>
            <TableCell>{scores[1].middle}</TableCell>
            <TableCell>{scores[1].cap}</TableCell>
            <TableCell>{scores[1].gov}</TableCell>
            <TableCell>Cell</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{scores[1].player}</TableCell>
            <TableCell>{scores[1].labor}</TableCell>
            <TableCell>{scores[1].middle}</TableCell>
            <TableCell>{scores[1].cap}</TableCell>
            <TableCell>{scores[1].gov}</TableCell>
            <TableCell>Cell</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{scores[1].player}</TableCell>
            <TableCell>{scores[1].labor}</TableCell>
            <TableCell>{scores[1].middle}</TableCell>
            <TableCell>{scores[1].cap}</TableCell>
            <TableCell>{scores[1].gov}</TableCell>
            <TableCell>{faker.number.int({ min: 1, max: 100 })}</TableCell>
          </TableRow> */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHeaderCell>合計</TableHeaderCell>
            <TableHeaderCell>
              {faker.number.int({ min: 1, max: 100 })}
            </TableHeaderCell>
            <TableHeaderCell>
              {faker.number.int({ min: 1, max: 100 })}
            </TableHeaderCell>
            <TableHeaderCell>
              {faker.number.int({ min: 1, max: 100 })}
            </TableHeaderCell>
            <TableHeaderCell>
              {faker.number.int({ min: 1, max: 100 })}
            </TableHeaderCell>
            <TableHeaderCell>
              {faker.number.int({ min: 100, max: 200 })}
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
