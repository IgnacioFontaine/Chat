// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOxyXNrSOuXstLb-wx50PUY2s2ubWdAb4",
  authDomain: "notwhatsapp-b1189.firebaseapp.com",
  projectId: "notwhatsapp-b1189",
  storageBucket: "notwhatsapp-b1189.appspot.com",
  messagingSenderId: "637118885199",
  appId: "1:637118885199:web:b2d49fcb8623bfedb2293a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };