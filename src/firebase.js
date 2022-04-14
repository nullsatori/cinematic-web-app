import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {useEffect, useState} from "react";
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
const auth = getAuth();
const storage = getStorage();
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("Uploaded file!");
}