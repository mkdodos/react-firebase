import { jsPDF } from "jspdf";
import font from "../../../components/font/CactusClassicalSerif-Regular-normal";



// 單張卡片
const genCard = (x, y, width, height, doc, obj) => {  
  doc.rect(x, y, width, height);
  //字型尺寸
  doc.setFontSize(10); 
  // 標題
  doc.text("[" + obj.class + "]" + " " + obj.title, x + 5, y + 33, {
    maxWidth: 50,
  });
  doc.setFontSize(10);
  // 內容
  doc.text(obj.content, x + 5, y + 6, { maxWidth: 50 });
};


export const print = (data) => {
  // 版面大小

  const page = { width: 297, height: 210 };

  // 第一張卡片初始位置
  const x = 5;
  const y = 5;
  // 卡片(外框)大小,位置
  let card = { width: 60, height: 40, x, y };
  // 每頁欄列數
  const columns = Math.floor(page.width / card.width);
  const rows = Math.floor(page.height / card.height);
  // 每頁筆數
  const pageCounts = columns * rows;

  // PDF 文件設定
  const doc = new jsPDF({
    orientation: "l",
    format: [page.width, page.height],
  });

  // 中文字型
  doc.addFileToVFS("name-for-addFont-use", font);
  doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
  doc.setFont("name-for-setFont-use");

  // 資料迴圈產生文件內容
  // 資料迴圈產生所有卡片
  for (let i = 0; i < data.length; i++) {

    genCard(card.x, card.y, card.width, card.height, doc, data[i]);

    // 換列
    if (i % columns == columns - 1 && i % pageCounts != pageCounts - 1) {
      card.x = x;
      card.y += card.height;
    }
    // 換頁
    else if (i % pageCounts == pageCounts - 1) {
      card.x = x;
      card.y = y;
      doc.addPage();
    } else {
      card.x += card.width;
    }
  }

  // 輸出 PDF
  doc.save("table.pdf");
};
