import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9Zuzlc5R5tj1a7sIBSM0WD5F2ztTygYw",
  authDomain: "auth-crud-2bf07.firebaseapp.com",
  projectId: "auth-crud-2bf07",
  storageBucket: "auth-crud-2bf07.appspot.com",
  messagingSenderId: "339738484630",
  appId: "1:339738484630:web:7d8a6c6d13ca0183acc7b7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);