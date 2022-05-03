import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAvkw9Ottta_wRsY0cl1sI1ueULCljUoFI",
  authDomain: "chat-app-f7953.firebaseapp.com",
  projectId: "chat-app-f7953",
  storageBucket: "chat-app-f7953.appspot.com",
  messagingSenderId: "1072765982016",
  appId: "1:1072765982016:web:9e96d22984fb9e3ccd96a5",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
