import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDVA6JfxLF8RXdDCKq0-s7aryXBVSpQ8pk",
    authDomain: "e-commerce-f4559.firebaseapp.com",
    databaseURL: "https://e-commerce-f4559-default-rtdb.firebaseio.com",
    projectId: "e-commerce-f4559",
    storageBucket: "e-commerce-f4559.appspot.com",
    messagingSenderId: "401682790263",
    appId: "1:401682790263:web:64c36eca87c82ef6281372",
    measurementId: "G-6B89Q4WL54"

}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase