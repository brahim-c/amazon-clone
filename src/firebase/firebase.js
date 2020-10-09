import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1zQmOc4YxQRZMNob6CO1otDUjAYtcFp0",
  authDomain: "e-7e629.firebaseapp.com",
  databaseURL: "https://e-7e629.firebaseio.com",
  projectId: "e-7e629",
  storageBucket: "e-7e629.appspot.com",
  messagingSenderId: "960525743739",
  appId: "1:960525743739:web:1283d8c4a58ea612ddd4de",
  measurementId: "G-Q9F5PB2X3Y",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
