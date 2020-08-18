import * as firebase from "firebase";
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1b7s1r1H_7uXzNdTgbpyNhGeUJ8oiktY",
    authDomain: "react-gallary.firebaseapp.com",
    databaseURL: "https://react-gallary.firebaseio.com",
    projectId: "react-gallary",
    storageBucket: "react-gallary.appspot.com",
    messagingSenderId: "847871263255",
    appId: "1:847871263255:web:5f1e67ee68cb57d248d252"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectStorage   = firebase.storage();
export const projectFirestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;