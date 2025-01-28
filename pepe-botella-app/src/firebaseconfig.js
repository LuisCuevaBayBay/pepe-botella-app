import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCtw1MhzfeBvmVMUZWceP7ZCrteak-_EtQ",
    authDomain: "pepe-botella-bd3ae.firebaseapp.com",
    projectId: "pepe-botella-bd3ae",
    storageBucket: "pepe-botella-bd3ae.firebasestorage.app",
    messagingSenderId: "709560500224",
    appId: "1:709560500224:web:f8feabfdf4e309af6158e5",
    measurementId: "G-7YVMP3F783"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);