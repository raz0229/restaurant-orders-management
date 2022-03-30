// import db
import { db } from "$lib/config/app";
import { getDeals, getProductsPopulatedWithPrices, getMetadata, getActiveHours, getDeliveryCharges } from "$lib/config/controllers";
import { collection, addDoc } from "firebase/firestore"; 

const postData = async (content, delivery, title, phone, address, notes) => {

    let time = new Date().toString().substring(4,21)
    let oldest = Math.round(new Date().getTime() / 10000);
    let latest = oldest * (-1)
    let total = 0;

    for (item of content) total += item.price;

    // Add a new document in collection "orders"
    await addDoc(collection(db, "orders"), {
        title : title.trim().substring(0,24), //name of person
        phone : phone.trim().substring(0,14),
        address : address.trim().substring(0,100),
        notes : notes.trim().substring(0,200),
        time,
        oldest,
        latest,        
        total: total + delivery,
        content
    })

}

const createContent = ( arrayToManipulate, deals, products ) => {
    return new Promise((resolve, reject) => {
        for (item of arrayToManipulate) {

            let metadata;
            if (item.type == 'deal') metadata = getMetadata(item.id, deals, item.size, item.qnt);
            else metadata = getMetadata(item.id, products, item.size, item.qnt);
    
            if (metadata === -1) {
                reject(400)
            }
    
            // returns an array of price, title and content at index 0, 1 and 2 respectively
            item.price = metadata[0];
            item.title = metadata[1];
            item.content = metadata[2];
        }

        resolve(arrayToManipulate)
    })
}

export async function post({ body }) {

    try {
        const isActiveHours = await getActiveHours();
        const deliveryCharges = await getDeliveryCharges();

        if (isActiveHours) {
            const products = await getProductsPopulatedWithPrices();
            const deals = await getDeals();

            const content = await createContent(body.content, deals, products);
    
            await postData(content, deliveryCharges, body.title, body.phone, body.address, body.notes)
    
        } else {
            return {
                status: 500
            }
        }

        return {
            status: 200
        }
    
    } catch (status) {
        return {
            status
        }
    }

}
