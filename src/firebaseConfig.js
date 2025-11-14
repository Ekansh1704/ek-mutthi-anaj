// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxYuGDocJPMADGSUT-8YqjWlmj1P3QNfE",
  authDomain: "ek-mutthi-anaj.firebaseapp.com",
  projectId: "ek-mutthi-anaj",
  storageBucket: "ek-mutthi-anaj.appspot.com",
  messagingSenderId: "353515145831",
  appId: "1:353515145831:web:2fcca30ccdc45d0158a2c2",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Enable offline persistence (for Firestore)
if (window.indexedDB) {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("⚠️ Persistence can only be enabled in one open tab at a time.");
    } else if (err.code === "unimplemented") {
      console.warn("⚠️ This browser does not support offline persistence.");
    } else {
      console.error("Error enabling persistence:", err);
    }
  });
} else {
  console.warn("⚠️ Offline mode not supported on this browser.");
}

// ✅ Export all initialized Firebase services
export { db, auth };
export default app;
