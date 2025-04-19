import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Hardcoded Firebase configuration for testing
const firebaseConfig = {
  apiKey: "AIzaSyDzyB2eNyGrckK8gihsbQVUgd18irb9lWc", // Hardcoded API Key
  authDomain: "tailor-f7dd2.firebaseapp.com", // Hardcoded Auth Domain
  projectId: "tailor-f7dd2", // Hardcoded Project ID
  storageBucket: "tailor-f7dd2.firebasestorage.app", // Hardcoded Storage Bucket
  messagingSenderId: "694371118340", // Hardcoded Messaging Sender ID
  appId: "1:694371118340:web:1381fb7d078d6402c67451", // Hardcoded App ID
  measurementId: "G-4P3XRTXQ3C", // Hardcoded Measurement ID
};

let app: FirebaseApp;
let db: Firestore;

// Prevent Firebase initialization duplication
if (getApps().length === 0) {
  // Check if essential config exists (especially projectId)
  if (!firebaseConfig.projectId) {
    console.error(
      "Firebase Project ID is missing in the hardcoded configuration."
    );
    // You might want to throw an error here or handle it gracefully
  } else {
    try {
      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      console.log("Firebase initialized successfully with hardcoded config."); // Added log
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      // Handle initialization error, maybe set app/db to null or throw
    }
  }
} else {
  // Use the existing app instance
  app = getApps()[0];
  db = getFirestore(app);
}

export { db, app };
