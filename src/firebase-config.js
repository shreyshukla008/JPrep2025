import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMZ5glNHnMeN5D-DCBf4EOFD0xPL2bt24",
  authDomain: "jprep-2025.firebaseapp.com",
  projectId: "jprep-2025",
  storageBucket: "jprep-2025.firebasestorage.app",
  messagingSenderId: "936649344224",
  appId: "1:936649344224:web:f07390f2bd0f6551a83c85",
  measurementId: "G-EM3KTT9N7C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInAnonymously };
