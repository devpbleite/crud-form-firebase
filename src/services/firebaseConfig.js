import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists()) {
    const { displayName, login, email, password, uid } = user;
    const { name } = additionalData;

    try {
      await setDoc(userRef, {
        name,
        displayName,
        login,
        email,
        password,
        uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Erro ao criar usuário", error);
    }
  }

  return getUserDocument(user.uid);
};

export const registerUser = async (email, password, additionalData) => {
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
