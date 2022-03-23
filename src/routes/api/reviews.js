// import db
import { db } from "$lib/app";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const getDocuments = async (sr) => { 
    let arr = [];
    const ref = collection(db, 'reviews')
    const q = query(ref, orderBy(sr), limit(20));  // default limit is 20 reviews

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push(Object.assign(doc.data()));
    });
    return arr;
}

let reviews = [];

export async function get({ query }) {
    
    let sort = query.get('order') ? query.get('order') : 'title'; // sort by default is by title 
    console.log(sort)
    
    await getDocuments(sort).then( review => {
        reviews = review;
    })


    return {
        status: 200,
        body: { reviews } 
    }
  
}