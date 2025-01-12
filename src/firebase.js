import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFDwydAl5V_lTJI295yi9AjI_lo97YXwQ",
  authDomain: "appdev1-task-manager-62906.firebaseapp.com",
  projectId: "appdev1-task-manager-62906",
  storageBucket: "appdev1-task-manager-62906.firebasestorage.app",
  messagingSenderId: "708410524603",
  appId: "1:708410524603:web:732142acc1b6000914fa9e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }