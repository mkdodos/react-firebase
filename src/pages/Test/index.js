import { jsPDF } from "jspdf";
import { Button } from "semantic-ui-react";
import font from "../../components/font/CactusClassicalSerif-Regular-normal";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase11/firestore/lite";
import { useEffect, useState } from "react";

export default function index() {
  const getData = async () => {
    const col = collection(db, "hegemony");
    const snapshot = await getDocs(col);
    const data = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log(data);
    setRows(data);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // 資料
  // const data = [
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     title: "Foreign Market Insight",
  //     date: "2025-08-06",
  //     id: "21HXfUsvcuCJr8tD5l1O",
  //     content:
  //       "翻開2張出口卡\n選擇1張換掉現在的出口卡\n其餘卡丟棄\n然後,你可以做一次出售到國外的動作",
  //     class: "資本家",
  //   },
  //   {
  //     title: "Foreign Market Insight",
  //     date: "2025-08-06",
  //     id: "21HXfUsvcuCJr8tD5l1O",
  //     content:
  //       "翻開2張出口卡\n選擇1張換掉現在的出口卡\n其餘卡丟棄\n然後,你可以做一次出售到國外的動作",
  //     class: "資本家",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  //   {
  //     date: "2025-08-06",
  //     id: "0cwHP5bnaMgPB8wV6vI4",
  //     title: "Growing Business",
  //     class: "資本家",
  //     content:
  //       "免費建造一個倉庫\n放在一個指定資源下方\n然後建立一個公司\n如果該間公司生產的資源\n和該倉庫資源相同\n可以少付4元",
  //   },
  // ];

  // 第一張卡片初始位置
  const x = 15;
  const y = 10;
  // 卡片位置大小
  let card = { x, y, width: 60, height: 80 };

  const doc = new jsPDF();

  // 單張卡片
  const genCard = (x, y, obj) => {
    const legitimacy = obj.legitimacy ? obj.legitimacy : "";
    doc.rect(x, y, card.width, card.height);
    //字型尺寸
    doc.setFontSize(10);
    doc.text(legitimacy, x + 5, y + 65, { maxWidth: 50 });
    doc.text(
      "[" + obj.class + "]" + " " + obj.title,
      x + 5,
      y + 70,
      { maxWidth: 50 }
    );
    // doc.text(obj.class, x + 5, y + 75, { maxWidth: 50 });
    doc.setFontSize(12);
    doc.text(obj.content, x + 5, y + 15, { maxWidth: 50 });
  };

  const generate = () => {
    // 中文字型
    doc.addFileToVFS("name-for-addFont-use", font);
    doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
    doc.setFont("name-for-setFont-use");
    // 資料迴圈產生所有卡片
    for (let i = 0; i < rows.length; i++) {
      // console.log(i % 9);
      genCard(card.x, card.y, rows[i]);
      // 每3張換列(加上 i % 9 != 8 和 i % 9 == 8 條件區隔)
      if (i % 3 == 2 && i % 9 != 8) {
        card.x = x;
        card.y += card.height;
      }
      // 每9張換頁
      else if (i % 9 == 8) {
        card.x = x;
        card.y = y;
        doc.addPage();
      } else {
        card.x += card.width;
      }
    }

    // doc.addPage();

    doc.save("table.pdf");
  };

  return (
    <div>
      <Button onClick={generate}>print</Button>
    </div>
  );
}
