import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { db } from "../../../utils/firebase";
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

export default function ItemDropdown({ onChange, value }) {
  const [options, setOptions] = useState([]);
  const fetchData = async () => {
    // 取得集合
    const col = collection(db, "assetBasic");
    // 資料快照
    const snapshot = await getDocs(col);
    // 資料跑迴圈轉成物件陣列
    const list = snapshot.docs.map((doc) => {
      const { itemName } = doc.data();
      return { text: itemName, value: itemName, key: doc.id };
    });
    setOptions(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dropdown
      selection
      search
      onChange={onChange}
      placeholder="選擇資料"
      options={options}
      value={value}
    />
  );
}
