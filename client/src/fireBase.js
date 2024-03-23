// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDquWKwdAbZbMmxhfU09MUkQWzZaDC5qSk",
  authDomain: "video-aecd5.firebaseapp.com",
  projectId: "video-aecd5",
  storageBucket: "video-aecd5.appspot.com",
  messagingSenderId: "785016076041",
  appId: "1:785016076041:web:8f4e6edae0d499fa1785d8",
  measurementId: "G-M18ETTJ4NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;