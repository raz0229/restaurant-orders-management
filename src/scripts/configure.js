/*
MUST RUN ONCE, AFTER ADDING CONFIGURATION FOR YOUR FIREBASE PROJECT
    
Sets up your firestore collections to add required settings to your
database and populate your database with dummy reviews and deals.

Data added can be updated or removed entirely through the admin panel 

*/

import { db, auth } from "../lib/config/app.js"
import { signInWithEmailAndPassword } from "firebase/auth"
import promptSync  from "prompt-sync"

const prompt = promptSync()
const email = prompt("Enter Email: ")
const pswd = prompt("Enter Password: ")

signInWithEmailAndPassword(auth, email.trim(), pswd).then(() => {
    console.log('Signed in successfully')
}).catch(err => {
    console.error(err)
})