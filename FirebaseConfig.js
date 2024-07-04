// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWOT22kx1PWExB9SWf81ZaPAozhjudaVA",
  authDomain: "webportapetbeta.firebaseapp.com",
  projectId: "webportapetbeta",
  storageBucket: "webportapetbeta.appspot.com",
  messagingSenderId: "411434491747",
  appId: "1:411434491747:web:2abd3b468cccdaf7ac3d56"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig); 
export const FIREBASE_AUTH = getAuth(FIREBASE_APP); 
export const FIREBASE_DB = getFirestore(FIREBASE_APP); 
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);