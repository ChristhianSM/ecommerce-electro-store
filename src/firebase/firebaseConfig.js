import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8lWsAFkjUdZVuvKrBf3gycxgjSa-gmnQ",
  authDomain: "ecommerce-react-1f7af.firebaseapp.com",
  projectId: "ecommerce-react-1f7af",
  storageBucket: "ecommerce-react-1f7af.appspot.com",
  messagingSenderId: "700596757129",
  appId: "1:700596757129:web:6d6fe4f57a27dbe0105c58"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const googleAuthProvider = new GoogleAuthProvider();
const facebookAtuhProvider = new FacebookAuthProvider();

export { 
    db, 
    auth,
    googleAuthProvider,
    facebookAtuhProvider
};
