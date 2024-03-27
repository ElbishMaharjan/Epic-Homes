// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "epic-homes2024.firebaseapp.com",
  projectId: "epic-homes2024",
  storageBucket: "epic-homes2024.appspot.com",
  messagingSenderId: "906609719161",
  appId: "1:906609719161:web:e43df3116d8380a01de1a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);