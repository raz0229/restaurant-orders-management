// import db
import { db } from "$lib/app";
import { collection, getDocs } from "firebase/firestore";

const getDocuments = async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
        arr.push(Object.assign(doc.data()));
    });
    return arr;
}

let reviews = [];

export async function get() {
    
    await getDocuments().then( review => {
        reviews = review;
    })

    return {
        status: 200,
        body: { reviews } 
    }
  
}