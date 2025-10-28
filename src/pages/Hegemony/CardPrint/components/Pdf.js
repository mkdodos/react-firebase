
// 函式庫
import { jsPDF } from "jspdf";
// 中文字型
import font from "../../../../components/font/msjhbd-normal";
import { da } from "@faker-js/faker";

export default function printPDF(data) {  
    console.log(data)
  const doc = new jsPDF("p", "pt");// l 橫印 p 直印  
  // 中文字型
  doc.addFileToVFS("name-for-addFont-use", font);
  doc.addFont("name-for-addFont-use", "name-for-setFont-use", "normal");
  doc.setFont("name-for-setFont-use");
  // 字型大小
  doc.setFontSize(20);
  // 文字內容  
  doc.text(data[0].title, 100, 100);
  doc.text(data[0].content, 100, 120);
  // 輸出檔案
  doc.save("a4.pdf");
}

