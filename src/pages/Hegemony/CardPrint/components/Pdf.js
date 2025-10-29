// 函式庫
import { jsPDF } from "jspdf";
// 中文字型
import font from "../../../../components/font/msjhbd-normal";
import autoTable from "jspdf-autotable";

export default function printPDF(data) {
  console.log(data);
  // 位置
  const pos = {
    title: { x: 15, y: 10 },
    content: { x: 15, y: 15 },
  };

  const doc = new jsPDF("p", "mm"); // l 橫印 p 直印
  // 中文字型
  doc.addFileToVFS("name-for-addFont-use", font);
  doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
  doc.setFont("name-for-setFont-use");
  // 字型大小
  doc.setFontSize(20);
  // 標題
  doc.text(data[0].class, pos.title.x, pos.title.y);
  // doc.text(data[0].content, 100, 120);
  // 輸出檔案
  // doc.save("a4.pdf");

  // 欄位標題
  // var columns = ["英文", "中文"];
  var columns = [
    { dataKey: "title", header: "標題" },
    { dataKey: "content", header: "內容" },
  ];
  // 列內容
  var rows = [
    [1, "Shaw", "Tanzania"],
    [2, "Nelson", "Kazakhstan"],
    [3, "Garcia", "Madagascar"],
  ];

  autoTable(doc, {
    theme: "grid", // 格線
    columns: columns, //欄位
    body: data, //內容
    margin: { left: pos.content.x, top: pos.content.y },
    columnStyles:{ title: { cellWidth:60 }},
    headStyles:{ font: "name-for-setFont-use",fontStyle: 'normal'},
    styles: {
      font: "name-for-setFont-use",
      // fontSize: 12,
    },
  });

  doc.save("table.pdf");
}
