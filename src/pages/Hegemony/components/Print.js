import { jsPDF } from "jspdf";
import font from "../../../components/font/CactusClassicalSerif-Regular-normal";

// console.log(data)

// 單張卡片
const genCard = (x, y, obj, doc,card) => {
  const legitimacy = obj.legitimacy ? obj.legitimacy : "";
  doc.rect(x, y, card.width, card.height);
  //字型尺寸
  doc.setFontSize(10);
  doc.text(legitimacy, x + 5, y + 65, { maxWidth: 50 });
  doc.text("[" + obj.class + "]" + " " + obj.title, x + 5, y + 70, {
    maxWidth: 50,
  });
  doc.setFontSize(12);
  doc.text(obj.content, x + 5, y + 15, { maxWidth: 50 });
};

export const print = (data) => {
  console.log(data);
  const doc = new jsPDF();

  // 第一張卡片初始位置
  const x = 15;
  const y = 10;
  // 卡片位置大小
  let card = { x, y, width: 60, height: 80 };

  // 中文字型
  doc.addFileToVFS("name-for-addFont-use", font);
  doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
  doc.setFont("name-for-setFont-use");
  // 資料迴圈產生所有卡片
  for (let i = 0; i < data.length; i++) {
    genCard(card.x, card.y, data[i], doc,card);
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

  doc.save("table.pdf");
};
