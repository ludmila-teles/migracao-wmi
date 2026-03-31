import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Substitua com os valores do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBdE3UPIIVAoH0e5g_B-ITBGaOf-4s8CNo",
  authDomain: "migracao-wmi.firebaseapp.com",
  projectId: "migracao-wmi",
  storageBucket: "migracao-wmi.firebasestorage.app",
  messagingSenderId: "97748283480",
  appId: "1:97748283480:web:5798b4d2da75761d589a2d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);