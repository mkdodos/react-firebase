import { db } from "../../../../utils/firebase";
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

      // 玩家分數記錄(準備將原始資料加入)
      // 加入後成為
      // {
      //   "player": "A",
      //   "gov": 30,
      //   "cap": 300,
      //   "middle": 10,
      //   "labor": 20
      // }
      const scores = [
        {
          player: "A",
          playerName: "馬克",
          // total:100
        },
        {
          player: "B",
          playerName: "宜君",
        },
        {
          player: "C",
          playerName: "愷軒",
        },
        {
          player: "D",
          playerName: "欣妤",
        },
      ];

      // 用玩家和角色取得分數
      const getScore = (player, role) => {
        const obj = data.find(
          (obj) => obj.player == player && obj.role == role
        );

        if (obj) {
          return obj.score;
        }
        return 0;
      };

      // 玩家資料
      const players = ["A", "B", "C", "D"];
      // 角色資料
      // const roles = ["gov", "cap", "middle", "labor"];
      const roles = [
        { id: "gov", name: "政府" },
        { id: "cap", name: "資本" },
        { id: "middle", name: "中產" },
        { id: "labor", name: "勞工" },
      ];

      const getTotal = () => {};

      // 用玩家角色取得分數
      // 玩家迴圏
      players.map((player) => {
        // 取得玩家所在列
        const index = scores.findIndex((row) => row.player == player);
        // 角色迴圈
        let sum = 0;
        roles.map((role) => {          
          // 設定玩家角色的分數
          const score = getScore(player, role.id);
          scores[index][role.id] = score;
          sum += Number(score);
        });
        scores[index].total = sum;
      });

      // const keys = Object.keys(scores[0]);
      console.log(scores);

      return {
        ...state,
        data,
        loading: false,
        scores,
        roles,
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
