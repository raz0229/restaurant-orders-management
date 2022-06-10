/*
MUST RUN ONCE, AFTER ADDING CONFIGURATION FOR YOUR FIREBASE PROJECT
    
Sets up your firestore collections to add required settings to your
database and populate your database with dummy reviews and deals.

Data added can be updated or removed entirely through the admin panel 

*/

import { db, auth } from "../lib/config/app.js"
import { doc, setDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword } from "firebase/auth"
import promptSync  from "prompt-sync"
import { createSpinner } from 'nanospinner'

const prompt = promptSync()
const email = prompt("Enter Email: ")
const pswd = prompt.hide("Enter Password: ")
const spinner = createSpinner(' Signing in').start()

console.clear()
try {
    await signInWithEmailAndPassword(auth, email.trim(), pswd)
    spinner.success()
    console.log("\x1b[32m", '[CONFIG] Signed in successfully!')
    await addSettings()
} catch (err) {
    spinner.error()
    console.log("\x1b[31m", '[CONFIG] Something went wrong!')
    process.exit()
}

const addSettings = async () => {
    try {
        await setDoc(doc(db, "settings2", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
    } catch (err) {
        console.log(err)
    }
}