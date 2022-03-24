// import db
import { db } from "$lib/app";
import { collection, addDoc } from "firebase/firestore"; 

const postData = async (title, stars, email, comment) => {

    let date = new Date().toDateString().substring(4,15)
    let oldest = Math.round(new Date().getTime() / 10000);
    let latest = oldest * (-1)

    // Add a new document in collection "reviews"
    await addDoc(collection(db, "reviews"), {
        title: title.trim().substring(0,20),
        stars,
        email: email.trim(),
        comment: comment.trim().substring(0,201),
        date,
        oldest,
        latest        
    })

}

export async function post({ body }) {
    
    await postData(body.title, body.stars, body.email, body.comment)
    
    return {
        headers: { Location: '/reviews' },
        status: 302
    }
    

}
