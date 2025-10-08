import { db } from "../../../../utils/firebase";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase11/firestore/lite";

export const reducer = async (state, action) => {
  // 集合名稱
  const colName = "hegemonyScoreboard";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;
  // 執行相關動作

  switch (action.type) {
    // 載入資料
    case "LOAD":
      // 取得集合
      const col = collection(db, colName);
      // 資料快照
      const snapshot = await getDocs(col);
      // 資料跑迴圈轉成物件陣列
      const data = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      console.log(data);

      // [{
      //     "date": "2025-10-04",
      //     "player": "C",
      //     "playerText": "愷軒",
      //     "role": "cap",
      //     "roleText": "資本",
      //     "score": "122",
      //     "id": "3yhwTgVFJLorxwZ5vSeM"
      // }]

      return { data };

    // 新增
    case "ADD":
      console.log("add");
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 儲存新增的資料
    case "CREATE":
      console.log(row);
      const docRef = await addDoc(collection(db, colName), {
        ...row,
      });
      // 接收後端傳回的 id , 加入 row 至陣列
      state.data.unshift({ ...row, id: docRef.id });

      return {
        ...state,
        data: state.data,
        open: false,
        rowIndex: -1,
      };

    // 編輯
    case "EDIT":
      return { ...state, open: true, rowIndex: index };

    // 更新
    case "UPDATE":
      await updateDoc(doc(db, colName, row.id), {
        ...row,
      });
      Object.assign(state.data[state.rowIndex], row);
      return {
        ...state,
        open: false,
        data: state.data,
        rowIndex: -1,
      };

    // 刪除
    case "DELETE":
      const id = action.payload.id;
      await deleteDoc(doc(db, colName, id));
      const dataDel = state.data.filter((obj) => obj.id != id);

      return {
        ...state,
        data: dataDel,
        open: false,
        rowIndex: -1,
      };

    // 關閉表單
    case "CLOSE":
      return { ...state, open: false };

    // 排序
    case "CHANGE_SORT":
      // 同一欄位重複按,反向排序
      if (state.sortedColumn === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      // 第一次按做遞增排序(數字欄位排序需先轉成數字)
      if (action.column == "score") {
        state.data.sort((a, b) =>
          Number(a[action.column]) > Number(b[action.column]) ? 1 : -1
        );
      } else {
        state.data.sort((a, b) =>
          a[action.column] > b[action.column] ? 1 : -1
        );
      }

      return {
        ...state,
        sortedColumn: action.column,
        direction: "ascending",
      };
  }
};
