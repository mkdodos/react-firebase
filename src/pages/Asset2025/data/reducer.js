import { db } from "../../../utils/firebase";

export const reducer = async (state, action) => {
  // 資料表名稱
  const table = state.table;

  // 執行相關動作
  switch (action.type) {
    // 載入資料
    case "LOAD":
      return {
        ...state,
        data: [
          { date: "2025/5/16", name: "玉山存款", amt: "100" },
          { date: "2025/5/16", name: "股票市值", amt: "772,909" },
        ],
      };
  }
};
