import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBMk1Q3fwU6Z8VO3DElSurprbF1w1Xqd4c",
  authDomain: "mycatchfishingapp.firebaseapp.com",
  projectId: "mycatchfishingapp",
  storageBucket: "mycatchfishingapp.appspot.com",
  messagingSenderId: "483001644447",
  appId: "1:483001644447:web:319b95dee6d4b77e93b9aa",
  measurementId: "G-E9ER9ZE6TP"

};


const firebaseApp = initializeApp(firebaseConfig);


export default firebaseApp;
