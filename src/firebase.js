// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDe7EFZEMqXMNkSC3R5E0fP-nlGJTi2ufk",
  authDomain: "chat-rapid-3d7f3.firebaseapp.com",
  projectId: "chat-rapid-3d7f3",
  storageBucket: "chat-rapid-3d7f3.appspot.com",
  messagingSenderId: "915306185397",
  appId: "1:915306185397:web:4cee2652cec28e0773b4fc",
  measurementId: "G-N70QKXXH6S"
};
  const app=firebase.initializeApp(firebaseConfig);

//   for authentication
// const firestore=firebase.firestore();
const auth=firebase.auth();
const db=app.firestore();

const goolgleProvider=new firebase.auth.GoogleAuthProvider();

export {auth,goolgleProvider}

export default db;