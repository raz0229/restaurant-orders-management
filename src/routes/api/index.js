import { db } from "$lib/app";
import { collection, getDocs, query } from "firebase/firestore";

const getDocuments = async () => { 

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


export async function get() {

  /*
    products are fixed. (cant be added or removed through admin dashboard).
    prices are fetched from Cloud Firestore for easy and secure access and modification.
    products array is populated with fetched prices.
    prices must cohere with Product ID of products array.
  */

const prices = await getDocuments()

// template array
let products = [
      {
        id: "00-00",
        title: "Chicken Tikka",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-tikka.jpg"
      },
      {
        id: "00-01",
        title: "Chicken Fajita",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-fajita.jpg"
      },
      {
        id: "00-02",
        title: "Fajita Sicilian",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/fajita-sicilian.jpg"
      },
      {
        id: "00-03",
        title: "Hot n Spicy",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/hot-n-spicy.jpg"
      },
      {
        id: "00-04",
        title: "Chicken Achari",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-achari.jpg"
      },
      {
        id: "00-05",
        title: "Chicken Tandoori",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-tandoori.jpg"
      },
      {
        id: "00-06",
        title: "Veggie Lover",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/veggie-lover.jpg"
      },
      {
        id: "00-07",
        title: "Cheese Lover",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/cheese-lover.jpg"
      },
      {
        id: "01-00",
        title: "Bonfire Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/bonfire.jpg"
      },
      {
        id: "01-01",
        title: "Super Supreme",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/super-supreme.jpg"
      },
      {
        id: "01-02",
        title: "Chicken Kebab",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-kebab.jpg"
      },
      {
        id: "01-03",
        title: "Creamy Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/creamy.jpg"
      },
      {
        id: "01-04",
        title: "Pepperoni Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/pepperoni.jpg"
      },
      {
        id: "01-05",
        title: "Extreme Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/extreme.jpg"
      },
      {
        id: "01-06",
        title: "Garlic Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/garlic.jpg"
      },
      {
        id: "01-07",
        title: "Chapli Pizza",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chapli.jpg"
      },
      {
        id: "02-00",
        title: "Chicken Hotwings",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-hotwings.jpg"
      },
      {
        id: "02-01",
        title: "Chicken Nuggets",
        priceS: 0, priceM: 0, priceL: 0,
        img: "/menu/chicken-nuggets.jpg"
      },
      {
        id: "03-00",
        title: "Zinger Burger",
        price: 0,
        img: "/menu/zinger-burger.jpg"
      },
      {
        id: "03-01",
        title: "500 ml drink",
        price: 0,
        img: "/menu/500ml-drink.jpg"
      },
      {
        id: "03-02",
        title: "1 litre drink",
        price: 0,
        img: "/menu/1l-drink.jpg"
      },
      {
        id: "03-03",
        title: "1.5 litre drink",
        price: 0,
        img: "/menu/1.5l-drink.jpg"
      },
      {
        id: "03-04",
        title: "French Fries",
        price: 0,
        img: "/menu/french-fries.jpg"
      }
    ];
  

    // populate array with fetched prices
    products.filter(obj => {
      if (obj.price) obj.price = prices.get(obj.id).price;
      else {
        obj.priceS = prices.get(obj.id).priceS;
        obj.priceM = prices.get(obj.id).priceM;
        obj.priceL = prices.get(obj.id).priceL;
      }
    })

    return {
        status: 200,
        body: { 
          products 
        } 
    }
    
  
  }