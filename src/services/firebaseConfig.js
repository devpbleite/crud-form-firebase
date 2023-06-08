import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9Zuzlc5R5tj1a7sIBSM0WD5F2ztTygYw",
  authDomain: "auth-crud-2bf07.firebaseapp.com",
  projectId: "auth-crud-2bf07",
  storageBucket: "auth-crud-2bf07.appspot.com",
  messagingSenderId: "339738484630",
  appId: "1:339738484630:web:7d8a6c6d13ca0183acc7b7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(db, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email, uid } = user;
    const { name } = additionalData;

    try {
      await setDoc(userRef, {
        name,
        displayName,
        email,
        uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Erro ao criar usuário", error);
    }
  }

  return getUserDocument(user.uid);
};

const registerUser = async (email, password, additionalData) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserDocument(user, additionalData);
    return user;
  } catch (error) {
    console.log("Erro ao registrar usuário", error);
    throw error;
  }  
};

const checkAuthentication = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); 
      resolve(user); 
    }, reject);
  });
};

export { app as firebaseApp, auth, db, registerUser, checkAuthentication };
