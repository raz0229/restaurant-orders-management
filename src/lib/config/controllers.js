import { db, products } from "$lib/config/app";
import { collection, getDocs, query } from "firebase/firestore";

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
  const querySnapshot = await getDocs(query(ref));
  querySnapshot.forEach((doc) => {
      arr.push(Object.assign(doc.data()));
  });
  return arr;
}

export const prices = await getPrices();

export const getMetadata = (id, arr, size, qnt) => {
  let item = arr.find(x => x.id.toString() == id)
  let price;

  if (item) {
      switch (size) {
          case 's':
              price = item.priceS * parseInt(qnt);
              break;
          case 'm':
              price = item.priceM * parseInt(qnt);
              break;
          case 'l':
              price = item.priceL * parseInt(qnt);
              break;
          default:
              price = item.price * parseInt(qnt);
              break;
      }
  
      return [price, item.title, item.content ? item.content : []];
  }

  return -1;
}


export const getProductsPopulatedWithPrices = async () => {

  const prices = await getPrices();
  
  return new Promise(resolve => {
      // populate array with fetched prices
      products.filter(obj => {
          if (obj.price !== undefined ) obj.price = prices.get(obj.id).price;
          else {
            obj.priceS = prices.get(obj.id).priceS;
            obj.priceM = prices.get(obj.id).priceM;
            obj.priceL = prices.get(obj.id).priceL;
          }
        })
      
      resolve(products)
  });
}