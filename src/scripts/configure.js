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


const setDocuments = (label, map, colName) => {
    return new Promise(async (resolve, reject) => {
        try {
            spinner.update({
                text: label
            }).start()
            
            for (const [key, value] of map) {
                await setDoc(doc(db, colName, key), value);
            }
            
            spinner.success()
            resolve(map)

        } catch (err) {
            reject(err)
        }
    })
}

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

const reviews = new Map([
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }],
    ["",{
        title: '',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '',
        email: '',
        latest: '',
        oldest: ''
    }]
])

console.clear()
try {
    await signInWithEmailAndPassword(auth, email.trim(), pswd)
    spinner.success()
    console.log("\x1b[32m", '[CONFIG] Signed in successfully!')

    await setDocuments(' [Creating Collection] Settings', settings, "settings2")

    process.exit()

} catch (err) {
    spinner.error()
    console.log("\x1b[31m", '[CONFIG] Something went wrong!')
    process.exit()
}
