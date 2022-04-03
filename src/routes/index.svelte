<script context="module">
  import { getSettings } from "$lib/config/controllers"

  export async function load({ fetch }) {
    const dealRes = await fetch('/api/deals')
    const res = await fetch('api/reviews')

    const { dealArray } = await dealRes.json()
    const { reviews } = await res.json()

    // fetch length of max_deals and max_reviews
    const max_deals = await getSettings("max-deals")
    const max_reviews = await getSettings("max-reviews")
    
    if (res.ok) {
      return {
        props: {
          dealArray,
          reviews,
          max_deals,
          max_reviews
        }
      }
    }

    return {
      status: res.status,
      error: new Error('Could not fetch the deals or reviews')
    }
  }
</script>

<script>
  import Cart from "$lib/cart.svelte"
  import Promo from "$lib/promo.svelte"
  import Deals from '$lib/deals.svelte'
  import Location from '$lib/location.svelte'
  import Testimonials from '$lib/testimonials.svelte'
  import { cart } from '$lib/stores';
  
  export let dealArray;
  export let reviews;
  export let max_deals, max_reviews;

  let hideCart;
  cart.subscribe(val => {
    hideCart = val;
  });

</script>

<Cart 
  bind:hideCart
  />
<Promo/>
<Location/>
<!-- 
  (OPTIONAL)
  MAX_DEALS can only be between 3 and deals.length 
-->
<Deals 
  bind:dealArray
  bind:hideCart
  MAX_DEALS={max_deals}
  showButton=true
  />
<!-- 
  (OPTIONAL)
  MAX_REVIEWS can only be between 3 and reviews.length 
-->
<Testimonials
  bind:reviews
  MAX_REVIEWS={max_reviews}
  showButton=true
  />

<style>

</style>