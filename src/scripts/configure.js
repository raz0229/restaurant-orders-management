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

const settings = new Map([
    ["active-hours", {
        startUTC: 3,
        endUTC: 18
    }],
    ["delivery-charges", {
        val: 200
    }],
    ["max-deals", {
        val: 6
    }],
    ["max-reviews", {
        val: 6
    }]
])

console.clear()
try {
    await signInWithEmailAndPassword(auth, email.trim(), pswd)
    spinner.success()
    console.log("\x1b[32m", '[CONFIG] Signed in successfully!')

    spinner.update({
        text: ' [Creating Collection] Settings'
    }).start()
    
    for (const [key, value] of settings) {
        await setDoc(doc(db, "settings2", key), value);
    }

    spinner.success()
    process.exit()

} catch (err) {
    spinner.error()
    console.log("\x1b[31m", '[CONFIG] Something went wrong!')
    process.exit()
}
