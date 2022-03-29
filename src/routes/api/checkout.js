// import db
import { db } from "$lib/config/app";
import { getDeals, getProductsPopulatedWithPrices, getMetadata, getActiveHours, getDeliveryCharges } from "$lib/config/controllers";
import { collection, addDoc } from "firebase/firestore"; 

const postData = async (content, delivery) => {

    let time = new Date().toString().substring(4,21)
    let oldest = Math.round(new Date().getTime() / 10000);
    let latest = oldest * (-1)
    let total = 0;

    for (item of content) total += item.price;
    console.log('Total: ', total + delivery)

    // // Add a new document in collection "reviews"
    // await addDoc(collection(db, "orders"), {
    //     title, //name of person
    //     phone,
    //     address,
    //     notes,
    //     time,
    //     oldest,
    //     latest        
    //     total: total + delivery,
    //     content
    // })

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

            const content = await createContent(body, deals, products);
    
            console.log(content)
            await postData(content, deliveryCharges)
    
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
