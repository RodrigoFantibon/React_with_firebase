import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCZjkUZovAO3ccSTqF_Z01T569aNO9MccM",
    authDomain: "curso-9da64.firebaseapp.com",
    projectId: "curso-9da64",
    storageBucket: "curso-9da64.appspot.com",
    messagingSenderId: "371903204645",
    appId: "1:371903204645:web:fcab8e8e19c3be7c495ecc",
    measurementId: "G-9RW02Q554V"
  };


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };