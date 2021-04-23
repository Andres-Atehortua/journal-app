import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsVFsdrXq7dceCc3po_6b3ILsOa_yfDrA',
  authDomain: 'react-journal-app-7a01b.firebaseapp.com',
  projectId: 'react-journal-app-7a01b',
  storageBucket: 'react-journal-app-7a01b.appspot.com',
  messagingSenderId: '957638548083',
  appId: '1:957638548083:web:5bc25fbe3890764644a806',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore

const db = firebase.firestore();
// Para autenticar con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
