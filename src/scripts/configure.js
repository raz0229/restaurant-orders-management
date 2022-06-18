/*
MUST RUN ONCE, AFTER ADDING CONFIGURATION FOR YOUR FIREBASE PROJECT
    
Sets up your firestore collections to add required settings to your
database and populate your database with dummy reviews and deals.

Data added can be updated or removed entirely through the admin panel 

*/

import { db, auth, client } from "../lib/config/app.js"
import { doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth"
import promptSync from "prompt-sync"
import { createSpinner } from 'nanospinner'
import { reviews, deals, settings, products, groups } from "./dummy.js"
import { basename } from 'path'
import { createReadStream } from 'fs'

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

const setGroups = () => {
  return new Promise(async resolve => {
    // create groups array filled with products
    groups.forEach(async (group, count) => {
      let ddoc, products = [];

      ddoc = {
        _id: group.id,
        _type: 'group',
        title: group.title,
        priority: group.priority,
        sizes: group.sizes
      }

      group.products.forEach(ref => {
        products.push({
          _key: `key-${ref}`,
          _ref: ref,
          _type: 'reference'
        })
      })

      ddoc.products = products;

      await client.createOrReplace(ddoc)

      spinner.update({
        text: ` [Creating Groups] ${Math.round(100 / groups.length * (count + 1))}%`
      }).start()
      if (count === (groups.length - 1)) {
        spinner.success()
        resolve(groups)
      }

    })
  })
}

const setProducts = () => {
  return new Promise(async resolve => {

    // create products with dummy data
    products.forEach(async (product, count) => {

      let ddoc;
      const filePath = `static/menu/${product.fileName}`

      const imageAsset = await client.assets
        .upload('image', createReadStream(filePath), {
          filename: basename(filePath)
        })

        // Here you can decide what to do with the returned asset document. 
        // If you want to set a specific asset field you can to the following:
        ddoc = {
          _id: product.id,
          _type: 'product',
          title: product.title,
          slug: {
            _type: 'slug',
            current: product.slug
          },
          prices: product.prices,
          image: {
            _type: 'image',
            asset: {
              _ref: imageAsset._id,
              _type: 'reference'
              }
            }
          }
        
        await client.createOrReplace(ddoc)
        spinner.update({
          text: ` [Creating Products] ${Math.round(100 / products.length * (count + 1))}%`
        }).start()
        if (count === (products.length - 1)) {
          spinner.success()
          resolve(products)
        }

    });

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
  await setProducts()
  await setGroups()

  process.exit()

} catch (err) {
  spinner.error()
  console.log("\x1b[31m", '[CONFIG] Something went wrong!')
  process.exit()
}
