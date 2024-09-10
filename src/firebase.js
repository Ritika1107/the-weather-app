import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuEKtDpFeb-WOMSK0xtAvKwRt7UgBuMaY",
  authDomain: "weather-app-1465e.firebaseapp.com",
  projectId: "weather-app-1465e",
  storageBucket: "weather-app-1465e.appspot.com",
  messagingSenderId: "970126066485",
  appId: "1:970126066485:web:d94845be018d30004e427c",
  measurementId: "G-5N7Q2M8V7W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Initialize Analytics
const db = getFirestore(app);  // Initialize Firestore

export { db, analytics };
