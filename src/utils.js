import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD94mYPzn-du3io133-v0U7qW0z0fR3N1A",
  authDomain: "gpt-learning-state.firebaseapp.com",
  projectId: "gpt-learning-state",
  storageBucket: "gpt-learning-state.appspot.com",
  messagingSenderId: "1031461616068",
  appId: "1:1031461616068:web:8a0fb4ab0f561fada54c91",
  measurementId: "G-8Q6CQM7FQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addHint = async (query, code, GPTResponse, prompt) => {
  const dbRef = collection(db, "individual_learning_state");

  const inp_data = {
    query,
    code: code,
    GPTResponse: GPTResponse,
    prompt: prompt,
  };
  const docRef = await addDoc(dbRef, inp_data);

  return docRef.id;
};

export const updateEvaluation = async (id, score) => {
  const docRef = doc(db, "individual_learning_state", id);
  const response = await updateDoc(docRef, {
    evaluation: score,
  });

  return response;
};

export const updateEvaluationText = async (id, text) => {
  const docRef = doc(db, "individual_learning_state", id);
  const response = await updateDoc(docRef, {
    evaluation_text: text,
  });

  return response;
};
