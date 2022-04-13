import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAIiIF5ieAo8Cw9X51ZUD4Fx1olzcPaehY",
  authDomain: "cinematic-8b95f.firebaseapp.com",
  projectId: "cinematic-8b95f",
  storageBucket: "cinematic-8b95f.appspot.com",
  messagingSenderId: "1065539893475",
  appId: "1:1065539893475:web:236f47abb582620e802dd6",
  measurementId: "G-MHC90R9D9P",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
