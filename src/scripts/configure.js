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
import { reviews, deals, settings, products} from "./dummy.js"
import {basename} from 'path'
import {createReadStream} from 'fs'

client.createOrReplace({
  _id: 'g0',
  _type: 'group',
  title: 'some group',
  priority: 99,
  sizes: ['S', 'M', 'L'],
  products: [
      {
        _key: 'somekeyvalue123', // unique key, could be anything
        _ref: 'bd05324c-42fb-4d55-9112-fd83f7ff12b8', // _id of french fries
        _type: 'reference'
      }
  ]
})

// products.forEach( product => {

//   let ddoc;
//   const filePath = `static/menu/${product.fileName}`
  
//   client.assets
//     .upload('image', createReadStream(filePath), {
//       filename: basename(filePath)
//     })
//     .then(imageAsset => {
//       // Here you can decide what to do with the returned asset document. 
//       // If you want to set a specific asset field you can to the following:
//       ddoc = {
//           _id: product.id,
//           _type: 'product',
//           title: product.title,
//           slug: {
//               _type: 'slug',
//               current: product.slug
//           },
//           prices: product.prices,
//           image: {
//               _type: 'image',
//               asset: {
//                   _ref: imageAsset._id,
//                   _type: 'reference'
//               }
//           }
//       }
//   })
//     .then(() => {
//       console.log(ddoc);
//       client.createOrReplace(ddoc)
//     })
  

// });

// const prompt = promptSync()
// const email = prompt("Enter Email: ")
// const pswd = prompt.hide("Enter Password: ")
// const spinner = createSpinner(' Signing in').start()

// const setDocuments = (label, map, colName) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             spinner.update({
//                 text: label
//             }).start()
            
//             for (const [key, value] of map) {
//                 await setDoc(doc(db, colName, key), value);
//             }
            
//             spinner.success()
//             resolve(map)

//         } catch (err) {
//             reject(err)
//         }
//     })
// }

// //console.clear()
// try {
//     await signInWithEmailAndPassword(auth, email.trim(), pswd)
//     spinner.success()
//     console.log("\x1b[32m", '[CONFIG] Signed in successfully!')

//     await setDocuments(' [Creating Collection] Settings', settings, "settings")
//     await setDocuments(' [Creating Collection] Reviews', reviews, "reviews")
//     await setDocuments(' [Creating Collection] Deals', deals, "deals")

//     process.exit()

// } catch (err) {
//     spinner.error()
//     console.log("\x1b[31m", '[CONFIG] Something went wrong!')
//     process.exit()
// }
