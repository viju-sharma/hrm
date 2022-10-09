import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOcdTHLwOa5vZii2iGRAJegNurHeqtxF8",
  authDomain: "human-resource-managemen-6a806.firebaseapp.com",
  projectId: "human-resource-managemen-6a806",
  storageBucket: "human-resource-managemen-6a806.appspot.com",
  messagingSenderId: "136103951145",
  appId: "1:136103951145:web:8fa95d4893aefd16431538",
  measurementId: "G-XPVS2CQDWT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
