import { API_HOST } from "../../../global/constants";
import axios from "axios";

export const reducer = async (state, action) => {
  // 集合名稱
  const colName = "stockBasic";
  // 編輯列
  const row = action.payload?.row;
  const index = action.payload?.index;

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      let url = `${API_HOST}/read.php`;
      const res = await axios.get(url, { params: { y: 2021, m: 12 } });

      console.log(res.data)

      return {
        ...state,
        data: res.data,
        loading: false,
      };

     

    // 新增
    case "ADD":     
      return {
        ...state,
        open: true,
        rowIndex: -1,
      };

    // 儲存新增的資料
    case "CREATE":
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
  } // END SWITCH
};
