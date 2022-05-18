import { getProductsPopulatedWithPrices } from "$lib/config/controllers";

export async function get() {

  /*
    Experimental: Products are being fetched from Sanity CMS. 
    More can be added or removed using the sanity studio or from the
    Products page from the Admin dashboard. 
    The link to the studio is referred via Vite's environment variable
    VITE_SANITY_STUDIO_URL in '.env' file in the root directory of
    this project.
  */

    // populate array with fetched prices
    const groups = await getProductsPopulatedWithPrices();

    return {
        status: 200,
        body: { 
          groups 
        } 
    }
    
  
  }