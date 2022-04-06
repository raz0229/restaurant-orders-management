// import db
import { db } from "$lib/config/app";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

let orders = [];
let lastVisible = null;

const getDocuments = async (sr, update, doc) => { 
    let arr = [];
    const ref = collection(db, 'orders')
    const q = query(ref, orderBy(sr), startAfter(doc || null), limit(20));  // default limit is 20 orders

    const querySnapshot = await getDocs(q);
    if (update) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
    querySnapshot.forEach((doc) => {
        if (doc.data()) arr.push(Object.assign(doc.data()));
    });
    return arr;
}

export async function get({ query }) {
    
    let sort = query.get('order') ? query.get('order') : 'latest'; // sort by default is by latest 

    let update;     // if true, next limit of data will be sent back
    if (query.get('update')) update = true;
    else {
        update = false
        lastVisible = null
    }
    
    try {
        await getDocuments(sort, update, lastVisible).then( order => {
            orders = order;
        })
        
        return {
            status: 200,
            body: { orders }
        }
    } catch (e) {
        return {
            status: 503
        }
    }
  
}