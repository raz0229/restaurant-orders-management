<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/deals.json')
    const { products } = await res.json()

    if (res.ok) {
      return {
        props: {
          products
        }
      }
    }

    return {
      status: res.status,
      error: new Error('Could not fetch the products')
    }
  }
</script>

<script>
    import Deals from "$lib/deals.svelte"
    import Cart from "$lib/cart.svelte"
    import Products from "$lib/products.svelte"
    import { cart } from '$lib/stores';

    export let products;

  let hideCart;
  let loadMore = false;

  cart.subscribe(val => {
    hideCart = val;
  });

  function isInViewport() {
    const rect = document.querySelector('#bottom').getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const scrollHandler = () => {
  if (isInViewport()) loadMore = true;
}

</script>

<svelte:window on:scroll="{ scrollHandler }"/>

<Cart
    bind:hideCart
/>

<Deals
    bind:hideCart
/>

{#if loadMore}
<Products bind:products/>
{/if}
