import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_Api_Key,
    authDomain: process.env.REACT_App_AuthDomain,
    projectId: process.env.REACT_APP_ProjectId,
    storageBucket: process.env.REACT_APP_StorageBucket,
    messagingSenderId: process.env.REACT_APP_MessagingSenderId,
    appId: process.env.REACT_APP_AppId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const colRef = collection(db, 'channels')

const GetData = async () => {
    let chennels = []

    getDocs(colRef)
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                chennels.push({ ...doc.data(), id: doc.id })
            })
            return chennels
        })
        .catch(err => {
            console.log(err.message)
        })
}

export { db, auth, provider, GetData } 