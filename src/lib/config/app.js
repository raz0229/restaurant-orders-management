import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import sanityClient from '@sanity/client'

const clientConfig = sanityClient({
  projectId: 'm0mpwiez',
  dataset: 'production',
  apiVersion: '2021-03-24', // use current UTC date - see "specifying API version"!
  token: 'skM3xHnDW0zsUQBCL646qMhs7RU82QNWdxV9xSzoRsuAnLfwck0y9CO8oKXwYMXEBOA343Hklx4XxPdfbgQmPXJBIRI6RB4Zf3I889078VLT5NZIrmFN9NE7PK8oQNKVCvPYnsmhuSEBa2ijp23fclFDT8PIaxARffUx5HJcUb5dZL4wPWUh', // auth token, or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtTl0VWY2ODir5w4q8hBjTrZ2rVB1AzRs", //AIzaSyCtTl0VWY2ODir5w4q8hBjTrZ2rVB1AzRs
  authDomain: "restaurant-mgmt-eba65.firebaseapp.com",
  projectId: "restaurant-mgmt-eba65",
  storageBucket: "restaurant-mgmt-eba65.appspot.com",
  messagingSenderId: "657776637136",
  appId: "1:657776637136:web:226b3b16645426373edad5",
  measurementId: "G-PK1N7JV7ER"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const client = clientConfig;
  
