import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHZ7RHEsa3qpBGD_a7SC4A7OSn5XbIh2E",
    authDomain: "img-community-5cb2b.firebaseapp.com",
    projectId: "img-community-5cb2b",
    storageBucket: "img-community-5cb2b.appspot.com",
    messagingSenderId: "261810000357",
    appId: "1:261810000357:web:2f093feb4c98e84a981f0c"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };