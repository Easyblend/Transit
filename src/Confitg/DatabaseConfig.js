import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "transit-online.firebaseapp.com",
  projectId: "transit-online",
  storageBucket: "transit-online.appspot.com",
  messagingSenderId: "143970832218",
  appId: process.env.REACT_APP_FIREBASE_AOU_ID,
};

const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
