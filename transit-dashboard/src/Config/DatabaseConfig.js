import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "transit-online.firebaseapp.com",
  projectId: "transit-online",
  storageBucket: "transit-online.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
