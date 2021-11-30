import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC8lWsAFkjUdZVuvKrBf3gycxgjSa-gmnQ",
//   authDomain: "ecommerce-react-1f7af.firebaseapp.com",
//   projectId: "ecommerce-react-1f7af",
//   storageBucket: "ecommerce-react-1f7af.appspot.com",
//   messagingSenderId: "700596757129",
//   appId: "1:700596757129:web:6d6fe4f57a27dbe0105c58"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyC4KEEgpajY4RyPY2l5C7ACntQWpAu_wvA",
//   authDomain: "food-social-e428b.firebaseapp.com",
//   projectId: "food-social-e428b",
//   storageBucket: "food-social-e428b.appspot.com",
//   messagingSenderId: "1016356781079",
//   appId: "1:1016356781079:web:f8d445c73f356ba9e53052"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD-PTGR-fr4mTwNEwagR4kzgqYxkOMzjQY",
  authDomain: "react-app-cursos-24c93.firebaseapp.com",
  projectId: "react-app-cursos-24c93",
  storageBucket: "react-app-cursos-24c93.appspot.com",
  messagingSenderId: "418853566862",
  appId: "1:418853566862:web:fe4574318557db29670cdf"
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
