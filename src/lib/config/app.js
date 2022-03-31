import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtTl0VWY2ODir5w4q8hBjTrZ2rVB1AzRs",
  authDomain: "restaurant-mgmt-eba65.firebaseapp.com",
  projectId: "restaurant-mgmt-eba65",
  storageBucket: "restaurant-mgmt-eba65.appspot.com",
  messagingSenderId: "657776637136",
  appId: "1:657776637136:web:226b3b16645426373edad5",
  measurementId: "G-PK1N7JV7ER"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// template array
export const products = [
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
  