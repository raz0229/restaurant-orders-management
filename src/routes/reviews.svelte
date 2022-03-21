<script context="module">
    export async function load({ fetch }) {
      const res = await fetch('/api/deals')
      const { reviews } = await res.json()
      
      if (res.ok) {
        return {
          props: {
            reviews
          }
        }
      }
  
      return {
        status: res.status,
        error: new Error('Could not fetch the reviews')
      }
    }
  </script>
  
  <script>
      import Testimonials from "$lib/testimonials.svelte"
      import Cart from "$lib/cart.svelte"
      import { cart } from '$lib/stores';
      
      export let reviews;
  
    let hideCart;
  
    cart.subscribe(val => {
      hideCart = val;
    });
  
  </script>
  
  <Cart
      bind:hideCart
  />
  
  <Testimonials
      bind:reviews
  />
  