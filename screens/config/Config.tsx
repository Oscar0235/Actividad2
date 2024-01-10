// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {  getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

/////////TODO: Add SDKs for Firebase products that you want to use
 ///https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXHgWA911KLsUu6vlonXAkgdy2W_NGpVM",
  authDomain: "app-movil2-3a607.firebaseapp.com",
  databaseURL: "https://app-movil2-3a607-default-rtdb.firebaseio.com",
  projectId: "app-movil2-3a607",
  storageBucket: "app-movil2-3a607.appspot.com",
  messagingSenderId: "42742911241",
  appId: "1:42742911241:web:bf530adcdcfa7c1dbd03d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const auth =getAuth(app)
export const db=getDatabase(app)
export const storage=getStorage(app)


////////////
 export const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});