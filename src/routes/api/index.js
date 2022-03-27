import { getProductsPopulatedWithPrices } from "$lib/config/controllers";

export async function get() {

  /*
    products are fixed. (cant be added or removed through admin dashboard).
    prices are fetched from Cloud Firestore for easy and secure access and modification.
    products array is populated with fetched prices.
    prices must cohere with Product ID of products array.
  */

    // populate array with fetched prices
    const products = await getProductsPopulatedWithPrices();

    return {
        status: 200,
        body: { 
          products 
        } 
    }
    
  
  }