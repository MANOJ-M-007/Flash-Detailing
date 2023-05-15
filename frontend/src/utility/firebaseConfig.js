// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA52_GJN3INkpfnvBljyg0luMCdeUy0gsQ",
  authDomain: "flash-d55ba.firebaseapp.com",
  projectId: "flash-d55ba",
  storageBucket: "flash-d55ba.appspot.com",
  messagingSenderId: "211621826771",
  appId: "1:211621826771:web:b96880548a4f834e930426",
  measurementId: "G-XWGZR86JGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
