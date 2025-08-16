import { Button } from "semantic-ui-react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import generate from "./pdf";
import { db } from "../../utils/firebase";
import {
  query,
  limit,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  startAfter,
} from "firebase11/firestore/lite";

export default function index() {
  //   const data = [
  //     ["Mark", "david@example.com", "Sweden"],
  //     ["Castille", "castille@example.com", "Spain"],
  //   ];

  const data = [
    {
      content:
        "免費建造一個倉庫,放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源和該倉庫資源相同\n可以少付4元",
      date: "2025-08-06",
      id: "0cwHP5bnaMgPB8wV6vI4",
      title: "Growing Business",
      class: "資本家",
    },
    {
      title: "Foreign Market Insight",
      date: "2025-08-06",
      id: "21HXfUsvcuCJr8tD5l1O",
      content:
        "翻開2張出口卡\n選擇1張換掉現在的出口卡\n其餘卡丟棄\n然後,你可以做一次出售到國外的動作",
      class: "資本家",
    },
    {
      title: "Export Subsidy",
      content: "出口每筆交易向政府收5元",
      requirement: "1A/1B",
      date: "2025-08-08",
      legitimacy: "滿意度",
      id: "2e1Pk8K6ZW4eBY3BROsV",
      class: "中產",
    },
    {
      date: "2025-08-05",
      id: "KzZ6SFcu5EoDhos30HOy",
      class: "資本家",
      content:
        "選擇一間你沒有勞工的公司,將薪資調到L3\n然後選擇一間同類型同勞工數的政府公司\n將該公司的勞工指派到你這間公司",
      title: "Competitive Wages",
    },
    {
      date: "2025-08-05",
      id: "LiG1Ks88IKXFbW2uyv70",
      title: "TAP Into New Markets",
      class: "資本家",
      content: "加入2個投票方塊到袋子\n然後發起國外貿易投票",
    },
    {
      title: "Buy Private Island",
      class: "資本家",
      content: "從資本拿50元給政府\n得到7分",
      date: "2025-08-06",
      id: "P8rDszWn5DSX0fQ4bsJ0",
    },
    {
      title: "Interest Groups",
      class: "資本家",
      content:
        "從袋子抽投票方塊,直到你抽到3個其他玩家顏色的方塊\n將這3個方塊丟棄\n然後放進3個你的投票方塊",
      date: "2025-08-06",
      id: "QKp03syqXbPc9lEBiZwi",
    },
  ];

    const getData = async () => {
      const col = collection(db, "hegemony");
      const snapshot = await getDocs(col);
      const dataF = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log(dataF);
    };

  const abc = () => {
    var doc = new jsPDF();
    autoTable(doc, {
      html: "#table",
      columnStyles: {
        0: {
          halign: "center",
          fillColor: [0, 255, 0],

          minCellHeight: 20,
        },
      },
    });
    doc.save("table.pdf");
  };

  return (
    <div>
      <Button onClick={() => generate(data)}>列印</Button>
      <Button onClick={abc}>abc</Button>
      {/* <Button onClick={() => getData()}>firebase</Button> */}
      <table id="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Country</th>
            <th>IP-address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Donna</td>
            <td>Moore</td>
            <td>dmoore0@furl.net</td>
            <td>China</td>
            <td>211.56.242.221</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Janice</td>
            <td>Henry</td>
            <td>jhenry1@theatlantic.com</td>
            <td>Ukraine</td>
            <td>38.36.7.199</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
