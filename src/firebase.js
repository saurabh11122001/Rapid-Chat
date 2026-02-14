// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
  const app=firebase.initializeApp(firebaseConfig);

//   for authentication
// const firestore=firebase.firestore();
const auth=firebase.auth();
const db=app.firestore();

const goolgleProvider=new firebase.auth.GoogleAuthProvider();

export {auth,goolgleProvider}

export default db;