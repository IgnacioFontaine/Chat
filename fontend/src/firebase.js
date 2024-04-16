import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOxyXNrSOuXstLb-wx50PUY2s2ubWdAb4",
  authDomain: "notwhatsapp-b1189.firebaseapp.com",
  projectId: "notwhatsapp-b1189",
  storageBucket: "notwhatsapp-b1189.appspot.com",
  messagingSenderId: "637118885199",
  appId: "1:637118885199:web:b2d49fcb8623bfedb2293a"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// const storage = getStorage(app, "gs://my-custom-bucket");
const storage = getStorage(app, "gs://notwhatsapp-b1189.appspot.com");

export { auth, db, storage };