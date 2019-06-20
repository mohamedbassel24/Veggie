import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDAXLmBDlEIbiyD2Gyb1U2OMCqpIpzPweE",
  authDomain: "myreactproject-d4417.firebaseapp.com",
  databaseURL: "https://myreactproject-d4417.firebaseio.com",
  projectId: "myreactproject-d4417",
  storageBucket: "myreactproject-d4417.appspot.com",
  messagingSenderId: "802023591013",
  appId: "1:802023591013:web:2b94e88a7f8fc232"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
