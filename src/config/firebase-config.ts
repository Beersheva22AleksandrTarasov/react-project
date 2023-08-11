// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfCu6e5wUAA92m7KejVfECBpiT-qPPwY4",
  authDomain: "my-project-dc5bb.firebaseapp.com",
  projectId: "my-project-dc5bb",
  storageBucket: "my-project-dc5bb.appspot.com",
  messagingSenderId: "671101219800",
  appId: "1:671101219800:web:1af4f6a67dcfe5c913f8ad"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;