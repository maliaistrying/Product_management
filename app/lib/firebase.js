import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyBwx1V-tEIEWlibH9TYTv_Dt9R5zpLx-VY",
  authDomain: "product-management-syste-a86ba.firebaseapp.com",
  projectId: "product-management-syste-a86ba",
  storageBucket: "product-management-syste-a86ba.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "398279530949",
  appId: "1:398279530949:web:0dd4255d415238b95d53ac",
  measurementId: "G-98DSL2L7E1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Optional

// Export services
export { auth, db, storage };
