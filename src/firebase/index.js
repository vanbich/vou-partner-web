import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDS3pdn8cYDdzGFYPHaG7nKpSDYLe3H6bk",
    authDomain: "vou-partner.firebaseapp.com",
    databaseURL: "https://vou-partner.firebaseio.com",
    projectId: "vou-partner",
    storageBucket: "vou-partner.appspot.com",
    messagingSenderId: "13632789277",
    appId: "1:13632789277:web:908a3029d9177760175ff4",
    measurementId: "G-K1LTKJZ79X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig).firestore().settings({host: "localhost:3000", ssl: false});

const storage = firebase.storage();

export  {
    storage, firebase as default
}
