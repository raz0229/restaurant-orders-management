<script context="module">
  export async function load({ fetch }) {
    const dealRes = await fetch('/api/deals')
    const { dealArray, reviews } = await dealRes.json()
    
    if (dealRes.ok) {
      return {
        props: {
          dealArray,
          reviews
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
  import { browser } from '$app/env';
  
  export let dealArray;
  export let reviews;

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
  MAX_DEALS=3
  showButton=true
  />
<!-- 
  (OPTIONAL)
  MAX_REVIEWS can only be between 3 and deals.length 
-->
<Testimonials
  bind:reviews
  MAX_REVIEWS=6
  showButton=true
  />

<style>

</style>