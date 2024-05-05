// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsz1ZBBTB3b7IinVNEFzfGU1JTS5TTL7c",
    authDomain: "dpi-project-3.firebaseapp.com",
    databaseURL: "https://dpi-project-3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dpi-project-3",
    storageBucket: "dpi-project-3.appspot.com",
    messagingSenderId: "1036350701238",
    appId: "1:1036350701238:web:1f94141f0b6d22cef83017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app)
const storage = getStorage()
export { database, app, auth, storage }