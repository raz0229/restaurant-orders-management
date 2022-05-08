// import db
import { db } from "$lib/config/app";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const getDocuments = async (sr) => { 
    let arr = [];
    const ref = collection(db, 'deals')
    const q = query(ref, orderBy(sr)); 

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push(Object.assign(doc.data(), {doc_id: doc.id}));
    });
    return arr;
}

let dealArray = [];

export async function get({ query }) {
    
    let sort = query.get('order') ? query.get('order') : 'id'; // sort by default is 'by id' 
    
    await getDocuments(sort).then( deal => {
        dealArray = deal;
    })

    return {
        status: 200,
        body: { dealArray }
    }
  
}