/*
MUST RUN ONCE, AFTER ADDING CONFIGURATION FOR YOUR FIREBASE PROJECT
    
Sets up your firestore collections to add required settings to your
database and populate your database with dummy reviews and deals.

Data added can be updated or removed entirely through the admin panel 

*/

import { db, auth, client } from "../lib/config/app.js"
import { doc, setDoc } from "firebase/firestore"; 
import { signInWithEmailAndPassword } from "firebase/auth"
import promptSync  from "prompt-sync"
import { createSpinner } from 'nanospinner'
import { reviews, deals, settings, convertToSlug } from "./dummy.js"
import {basename} from 'path'
import {createReadStream} from 'fs'

const ddoc = {
    _id: '012',
    _type: 'product',
    title: 'Some Pizza',
    slug: {
        _type: 'slug',
        current: 'some-slug'
    },
    prices: [450, 750, 900],
    image: {
        _type: 'image',
        asset: {
            _ref: 'image-70306396e903ac08e84e2785594ebf80648adaea-1080x1338-jpg',
            _type: 'reference'
        }
    }
}

const filePath = 'static/menu/akram0.jpg'

client.assets
  .upload('image', createReadStream(filePath), {
    filename: basename(filePath)
  })
  .then(imageAsset => {
    // Here you can decide what to do with the returned asset document. 
    // If you want to set a specific asset field you can to the following:
    return client
      .patch('akram-0')
      .set({
        theImageField: {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: imageAsset._id
          }
        }
      })
      .commit()
  })
  .then(() => {
    console.log("Done!");
  })

client.createOrReplace(ddoc).then((res) => {
    console.log(`Bike was created, document ID is ${res._id}`)
})

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

console.clear()
try {
    await signInWithEmailAndPassword(auth, email.trim(), pswd)
    spinner.success()
    console.log("\x1b[32m", '[CONFIG] Signed in successfully!')

    await setDocuments(' [Creating Collection] Settings', settings, "settings")
    await setDocuments(' [Creating Collection] Reviews', reviews, "reviews")
    await setDocuments(' [Creating Collection] Deals', deals, "deals")

    process.exit()

} catch (err) {
    spinner.error()
    console.log("\x1b[31m", '[CONFIG] Something went wrong!')
    process.exit()
}
