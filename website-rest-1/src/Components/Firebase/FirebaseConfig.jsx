// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH-qyQnDmZBGDAg4Gr6Bt6YUpy72p4qck",
  authDomain: "restaurant-wok-test.firebaseapp.com",
  projectId: "restaurant-wok-test",
  storageBucket: "restaurant-wok-test.appspot.com",
  messagingSenderId: "551510747486",
  appId: "1:551510747486:web:5469396334166a872a07cf",
  measurementId: "G-CHS42P1ZGQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);