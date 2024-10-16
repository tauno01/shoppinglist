import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "shoppinglist-e02eb.firebaseapp.com",
    projectId: "shoppinglist-e02eb",
    storageBucket: "shoppinglist-e02eb.appspot.com",
    messagingSenderId: "1044347840697",
    appId: "1:1044347840697:web:7255cb2615c7f501741368"
};

initializeApp(firebaseConfig)

const firestore = getFirestore()

const ITEMS = 'items'

export {
    firestore,
    collection,
    addDoc,
    ITEMS,
    query,
    onSnapshot,
    deleteDoc,
    doc
}