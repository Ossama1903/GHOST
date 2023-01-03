// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLAEMHKfbGBUSqesZuronbaDwe5m1KY78",
  authDomain: "ghost-e4544.firebaseapp.com",
  projectId: "ghost-e4544",
  storageBucket: "ghost-e4544.appspot.com",
  messagingSenderId: "1055380646416",
  appId: "1:1055380646416:web:0f62e50c098c09c5b7b895",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
