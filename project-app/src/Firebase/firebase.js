// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZzyhJ0XpSvya47k2IbrUHICQm1OLvsiM",
  authDomain: "campusgram-5877d.firebaseapp.com",
  projectId: "campusgram-5877d",
  storageBucket: "campusgram-5877d.appspot.com",
  messagingSenderId: "979713660257",
  appId: "1:979713660257:web:ed93bc5bc81f86c187e120",
  measurementId: "G-6LQEH5SKGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export{app, auth, firestore, storage};