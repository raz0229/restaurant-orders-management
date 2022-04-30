<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('/api')
    const dealRes = await fetch('/api/deals')

    const { dealArray } = await dealRes.json()
    const { groups } = await res.json()
    
    if (res.ok) {
      return {
        props: {
          groups,
          dealArray
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
    
    export let dealArray;
    export let groups;

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

const scrollToBottom = () => {
  window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}

</script>

<svelte:window on:scroll="{ scrollHandler }"/>

<Cart
    bind:hideCart
/>

<Deals
    bind:dealArray
    bind:hideCart
/>

{#if loadMore}
<Products bind:groups/>
{:else}
<div class="floater fixed bottom-4 left-4" on:click="{scrollToBottom}" >
  <button
          class="p-0 w-12 h-12 bg-indigo-500 dark:bg-dark-indigo hover:bg-indigo-700 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
  </button>
</div>
{/if}

<style>
  .floater {
    animation: bounce 1s infinite;
  }
 
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>