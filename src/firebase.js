import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAaYZUbAShfzPeWzBzGHKViYziPIFB-fG8",
  authDomain: "imessage-clone-3d5b0.firebaseapp.com",
  databaseURL: "https://imessage-clone-3d5b0.firebaseio.com",
  projectId: "imessage-clone-3d5b0",
  storageBucket: "imessage-clone-3d5b0.appspot.com",
  messagingSenderId: "37673953268",
  appId: "1:37673953268:web:fc12aa9ac3a05d7fc9fba1",
  measurementId: "G-Z0TM1XTNPX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
