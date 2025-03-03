// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAfPdZkeCrmHHdesiewrZ-aq8zJvz8nDmo",
  authDomain: "pet-adoption-system-402a7.firebaseapp.com",
  projectId: "pet-adoption-system-402a7",
  storageBucket: "pet-adoption-system-402a7.appspot.com", // Fix URL here!
  messagingSenderId: "606742054370",
  appId: "1:606742054370:web:200e706e8331f5539965bb",
  measurementId: "G-28F93G7PW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
