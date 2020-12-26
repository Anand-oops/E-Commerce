import firebase from 'firebase'

const firebaseConfig = {
//   apiKey: "AIzaSyD7u2lAg2DWWCMJ3FRRH7BcrsixZ7nwMHE",
//   authDomain: "housing-b74d7.firebaseapp.com",
//   databaseURL: "https://housing-b74d7.firebaseio.com",
//   projectId: "housing-b74d7",
//   storageBucket: "housing-b74d7.appspot.com",
//   messagingSenderId: "838189578809",
//   appId: "1:838189578809:web:9a198857a5b2ed6da3ebe8"

apiKey: "AIzaSyDVA6JfxLF8RXdDCKq0-s7aryXBVSpQ8pk",
authDomain: "e-commerce-f4559.firebaseapp.com",
projectId: "e-commerce-f4559",
storageBucket: "e-commerce-f4559.appspot.com",
messagingSenderId: "401682790263",
appId: "1:401682790263:web:64c36eca87c82ef6281372",
measurementId: "G-6B89Q4WL54"

}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase