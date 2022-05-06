import { db, auth, client, products } from "$lib/config/app";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"

const groupQuery = `*[_type == "group"]
{
  title,
  sizes,
  priority,
  products[]->{
    _id,
    title,
    prices,
    "img" : image.asset->url
  }
}`;

const getPrices = async () => {

    let prices = new Map();
  
      const ref = collection(db, 'prices')
      const querySnapshot = await getDocs(query(ref));
  
      querySnapshot.forEach((doc) => {
  
        let temp = doc.data()
  
        if (temp.price) prices.set(doc.id, {price: temp.price}) // for static prices
        else {
          prices.set(doc.id, {
              priceS: temp.priceS,
              priceM: temp.priceM,
              priceL: temp.priceL
          })
        }
        
      });
  
      return prices
}


// exports
export const getDeals = async () => { 
  let arr = [];
  const ref = collection(db, 'deals')
  try {
    const querySnapshot = await getDocs(query(ref));
    querySnapshot.forEach((doc) => {
      arr.push(Object.assign(doc.data()));
    });
    return arr;
  } catch (e) {
    return arr;
  }
}

export const getActiveHours = async () => {
  const ref = doc(db, "settings", "active-hours");
  const snap = await getDoc(ref);
  const hour = new Date().getUTCHours();

  if (snap.exists()) {
    return new Promise((resolve) => {
      if ((hour > snap.data().startUTC) && (hour < snap.data().endUTC)) resolve(true)
      resolve(false)
    })
  } 
}

export const getSettings = async (field) => {
  const ref = doc(db, "settings", field);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().val;
  } 
  return undefined;
}

export const prices = await getPrices();

export const getMetadata = (id, arr, size, qnt) => {
  let item = arr.find(x => x.id.toString() == id)
  let price, title = item.title;

  if (item) {
      switch (size) {
          case 's':
              price = item.prices[0] * parseInt(qnt);
              title = `${item.title} (${item.sizes[0]})`;
              break;
          case 'm':
              price = item.prices[1] * parseInt(qnt);
              title = `${item.title} (${item.sizes[1]})`;
              break;
          case 'l':
              price = item.prices[2] * parseInt(qnt);
              title = `${item.title} (${item.sizes[2]})`;
              break;
          default:
              price = item.price * parseInt(qnt) || item.prices[0] * parseInt(qnt);
              break;
      }
      return [price, title, item.content ? item.content : []];
  }

  return -1;
}


export const getProductsPopulatedWithPrices = async () => {


// client.fetch(groupQuery).then((products) => {
//   console.log('Products: ')
//   products.forEach((product) => {
//    console.log(product.title, product.priority , product.sizes)
//      product.products.forEach(x => {
//         console.log(x._id, x.title, x.prices)
//         console.log(`${x.img}?h=250`, '\n')
//      })
     
//   })
// })
  const groups = await client.fetch(groupQuery)
  return new Promise( resolve => {
    resolve(groups)
  })

  // const prices = await getPrices();
  
  // return new Promise(resolve => {
  //     // populate array with fetched prices
  //     products.filter(obj => {
  //         if (obj.price !== undefined ) obj.price = prices.get(obj.id).price;
  //         else {
  //           obj.priceS = prices.get(obj.id).priceS;
  //           obj.priceM = prices.get(obj.id).priceM;
  //           obj.priceL = prices.get(obj.id).priceL;
  //         }
  //       })
      
  //     resolve(products)
  // });
}

export const getAllProducts = async () => {
  const groups = await client.fetch(groupQuery)
  return new Promise( resolve => {
    let arr = [];
    groups.forEach( group => {
      group.products.forEach( product => {
        arr.push(Object.assign({
          id: product._id,
          img: product.img,
          prices: product.prices,
          title: product.title,
          sizes: group.sizes
        }));
      })
    });
    resolve(arr)
  })
}

export const isSignedIn = async () => {
  return new Promise( async resolve => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({user})
      } else {
        resolve(null);
      }
  
     });
  })
}
