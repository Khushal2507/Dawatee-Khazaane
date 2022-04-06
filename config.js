// const firebase = require('firebase-admin')
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore}  from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmJkzz3OjjRsu3pPX8DoC232QhSuHYCvQ",
    authDomain: "dawatee-khazanee.firebaseapp.com",
    projectId: "dawatee-khazanee",
    storageBucket: "dawatee-khazanee.appspot.com",
    messagingSenderId: "896486057906",
    appId: "1:896486057906:web:c444e5441b19da524b26ab",
    measurementId: "G-TSQEEHX8G0"
  };

  export const FirebaseApp = initializeApp(firebaseConfig)
  export const db = getFirestore(FirebaseApp)