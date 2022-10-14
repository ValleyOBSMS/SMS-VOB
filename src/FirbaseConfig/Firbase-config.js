import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmfRi7AVfdAQKY7thp_uji-LfIzoP2Ye4",
  authDomain: "sms-vob.firebaseapp.com",
  projectId: "sms-vob",
  storageBucket: "sms-vob.appspot.com",
  messagingSenderId: "802480956692",
  appId: "1:802480956692:web:9b62af86d04edf6301ce01",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };
