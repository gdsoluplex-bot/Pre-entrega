import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTqZ9faLMG2y0ATqthDfdA46lOjbfBmu0",
  authDomain: "mi-ecommerce-reactjs-01-9e1ba.firebaseapp.com",
  projectId: "mi-ecommerce-reactjs-01-9e1ba",
  storageBucket: "mi-ecommerce-reactjs-01-9e1ba.firebasestorage.app",
  messagingSenderId: "487622722487",
  appId: "1:487622722487:web:3c220fdf7c0aae74b6de32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);