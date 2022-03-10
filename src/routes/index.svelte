<script>
  import Cart from "$lib/cart.svelte"
  import Promo from "$lib/promo.svelte"
  import Deals from '$lib/deals.svelte'
  import Location from '$lib/location.svelte'
  import Testimonials from '$lib/testimonials.svelte'
  import { cart } from '$lib/stores';

  let hideCart;
  cart.subscribe(val => {
    hideCart = val;
  });

</script>

<Cart bind:hideCart/>

<Promo/>

<Location/>

<Deals bind:hideCart/>

<Testimonials/>

<style>

</style>