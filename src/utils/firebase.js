import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDUSJ5yzHvTCCSQTuONsPtOBGodjamReHc',
  authDomain: 'money2022-173b9.firebaseapp.com',
  projectId: 'money2022-173b9',
  storageBucket: 'money2022-173b9.appspot.com',
  messagingSenderId: '944583877759',
  appId: '1:944583877759:web:0fd8a43af8a727a76c0b4a',
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const auth = app.auth();

export { db,auth };
