<script>
  import Cart from "$lib/cart.svelte"
  import Promo from "$lib/promo.svelte"
  import Deals from '$lib/deals.svelte'
  import Location from '$lib/location.svelte'
  import Testimonials from '$lib/testimonials.svelte'
  import { cart } from '$lib/stores';
  import { browser } from '$app/env';

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
  bind:hideCart
  MAX_DEALS=3
  showButton=true
  />
<Testimonials/>

<style>

</style>