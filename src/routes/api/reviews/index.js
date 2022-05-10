// import db
import { db } from "$lib/config/app";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

let reviews = [];
let lastVisible = null;

const getDocuments = async (sr, update, doc) => { 
    let arr = [];
    const ref = collection(db, 'reviews')
    const q = query(ref, orderBy(sr), startAfter(doc || null), limit(20));  // default limit is 20 reviews

    const querySnapshot = await getDocs(q);
    if (update) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    //const snap = await loadMore(querySnapshot, ref, sr);

    querySnapshot.forEach((doc) => {
        if (doc.data()) arr.push(Object.assign(doc.data(), {doc_id: doc.id}));
    });
    return arr;
}

export async function get({ query }) {
    
    let sort = query.get('order') ? query.get('order') : 'title'; // sort by default is by title 

    let update;     // if true, next limit of data will be sent back
    if (query.get('update')) update = true;
    else {
        update = false
        lastVisible = null
    }
    
    await getDocuments(sort, update, lastVisible).then( review => {
        reviews = review;
    })


    return {
        status: 200,
        body: { reviews }
    }
  
}