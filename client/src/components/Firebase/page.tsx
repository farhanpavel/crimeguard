import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyB3EVJX40AW2oAKtYufFbFLzH89G-8e5xs",
  authDomain: "crime-nsu.firebaseapp.com",
  projectId: "crime-nsu",
  storageBucket: "crime-nsu.firebasestorage.app",
  messagingSenderId: "913210121354",
  appId: "1:913210121354:web:0f419a343a9c188c19e173",
  measurementId: "G-QFMZN0K789"
};


const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app)
