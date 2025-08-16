import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
// 中文字型
// import font from "../../components/font/NotoSerifTC-Regular-normal";
import font from "../../components/font/CactusClassicalSerif-Regular-normal";

export default function generate(data) {
  const doc = new jsPDF();

  // 中文字型
  doc.addFileToVFS("name-for-addFont-use", font);
  doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
  doc.setFont("name-for-setFont-use");

  autoTable(doc, {
    theme:"grid",
    // 資料
    body: data,
    // 欄位
    columns: [
      { header: "Title", dataKey: "title" },
      { header: "Content", dataKey: "content" },
      { header: "Class", dataKey: "class" },
    ],
    // 中文字型
    styles: {
      // fontStyle 要設定才不會報錯
      fontStyle: 'normal',
      fontSize: 10,
      font: "name-for-setFont-use",
    },
  });

  doc.save("table.pdf");
}
