// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"; //For authentication
import {getFirestore} from "firebase/firestore"; //For keeping track of users, information about users and their posts
import {getStorage} from "firebase/storage"; //For storage of images

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); //might be a probelm here!
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);
const storage = getStorage(app);

export{app, auth, firestore, storage};