import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyAwxHFVimS4PRmJOTnCKmauFx71Tc_9Bag",
    authDomain: "lociones-12050.firebaseapp.com",
    projectId: "lociones-12050",
    storageBucket: "lociones-12050.appspot.com",
    messagingSenderId: "10066164341",
    appId: "1:10066164341:web:f37a0f78d39c9905cd963c"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCollection = async (coll) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const response = collection(db, coll);
    const data = await getDocs(response);
    const arrayData = data.docs.map((element) => ({
      id: element.id,
      ...element.data(),
    }));
    result.statusResponse = true;
    result.data = arrayData;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (coll, data) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const res = collection(db, coll);
    const response = await addDoc(res, data);
    result.statusResponse = true;
    result.data = { id: response.id };
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const getDocument = async (coll, id) => {
  const result = {
    statusResponse: false,
    data: null,
    error: null,
  };
  try {
    const res = collection(db, coll, id);
    const response = await getDoc(res);
    result.data = { id: response.id, ...response.data() };
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateDocument = async (coll, id, data) => {
  const result = {
    statusResponse: false,
    error: null,
  };
  try {
    const res = doc(db, coll, id);
    await updateDoc(res, data);
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const deleteDocument = async (coll, id) => {
  const result = {
    statusResponse: false,
    error: null,
  };
  try {
    const res = doc(db, coll, id);
    await deleteDoc(res)
    result.statusResponse = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};
