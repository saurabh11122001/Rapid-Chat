// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBEnBrSOkuFC-5GJnC-EVfYuEsAHJBE_eY",
    authDomain: "chat-rapid-e5301.firebaseapp.com",
    projectId: "chat-rapid-e5301",
    storageBucket: "chat-rapid-e5301.appspot.com",
    messagingSenderId: "827292244635",
    appId: "1:827292244635:web:307e64e223c1c24760843e",
    measurementId: "G-6Y4HVBJ9ZG"
  };
  const app=firebase.initializeApp(firebaseConfig);

//   for authentication

const auth=firebase.auth();
const db=app.firestore();

const goolgleProvider=new firebase.auth.GoogleAuthProvider();

export {auth,goolgleProvider}

export default db;