import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import sanityClient from '@sanity/client'

const clientConfig = sanityClient({
  projectId: '',
  dataset: '',
  apiVersion: '2021-03-24', // use current UTC date - see "specifying API version"!
  token: '', // required auth token for authenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "", 
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const client = clientConfig;
  
