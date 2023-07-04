// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,  GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU7gGRTXXoS3HlUYTIhNuMfrIh_niFJQg",
  authDomain: "event-planner-391807.firebaseapp.com",
  projectId: "event-planner-391807",
  storageBucket: "event-planner-391807.appspot.com",
  messagingSenderId: "872670047363",
  appId: "1:872670047363:web:026fa38306a870cdd57fb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
