import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHaZMjsiZQC591MfKPYL9twPxHcAui2A8",
    authDomain: "react-app-9ef3f.firebaseapp.com",
    projectId: "react-app-9ef3f",
    storageBucket: "react-app-9ef3f.firebasestorage.app",
    messagingSenderId: "771517980378",
    appId: "1:771517980378:web:6838901449c630a798cfe3",
    measurementId: "G-RLH59DYCLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;