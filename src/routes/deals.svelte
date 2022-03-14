<script>
    import Deals from "$lib/deals.svelte"
    import Cart from "$lib/cart.svelte"
    import {browser} from "$app/env"
    import { cart } from '$lib/stores';

    let hideCart;
  cart.subscribe(val => {
    hideCart = val;
  });

//if (browser) location.reload();

</script>

<Cart 
    bind:hideCart
/>

<Deals 
    bind:hideCart
/>
