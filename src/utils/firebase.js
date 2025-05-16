import { initializeApp } from "firebase11/app";
import { getAuth } from "firebase11/auth";
import { getFirestore } from "firebase11/firestore/lite";

const firebaseConfig2 = {
  apiKey: "AIzaSyDUSJ5yzHvTCCSQTuONsPtOBGodjamReHc",
  authDomain: "money2022-173b9.firebaseapp.com",
  projectId: "money2022-173b9",
  storageBucket: "money2022-173b9.appspot.com",
  messagingSenderId: "944583877759",
  appId: "1:944583877759:web:0fd8a43af8a727a76c0b4a"
};

const firebaseConfig = {
  apiKey: "AIzaSyClLeHQJMt3BzbrK_AHpWeq0nlqzY2r5ik",
  authDomain: "money-39797.firebaseapp.com",
  projectId: "money-39797",
  storageBucket: "money-39797.appspot.com",
  messagingSenderId: "142963352306",
  appId: "1:142963352306:web:ac3c09e593009a5175666b",
  measurementId: "G-012VKYDZ07",
};

const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2,"abc");

const db = getFirestore(app);
const db2 = getFirestore(app2);


const auth = getAuth(app);

 

export { db,db2,auth };

// 主控台規則頁面設定
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if
//           request.time < timestamp.date(2025, 8, 31);
//     }
//   }
// }
