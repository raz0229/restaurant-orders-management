<script>
  import { cart, theme } from './stores.js';
  import { fly } from 'svelte/transition';
  import { browser } from '$app/env';

  export let title = "Your Business"
  let isMobile = false, mode;

  theme.subscribe( value => {
      mode = value;
  })

  if (browser) {
    if (mode == 'dark') document.querySelector('html').classList.add('dark');
  }

  const showCart = () => {
    cart.update(x => !x)
  }

  const toggleDarkMode = () => {
    if (mode == 'dark') {
      console.log('mode was dark')
      theme.set('light');
      document.querySelector('html').classList.remove('dark');
      document.querySelector('html').classList.add('light');
    }
    else {
      theme.set('dark');
      document.querySelector('html').classList.remove('light');
      document.querySelector('html').classList.add('dark');
    }
    localStorage.setItem('mode', mode);
  }
  

</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="fixed top-0 w-full z-40 bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden" on:click="{ () => isMobile = !isMobile}">
        <!-- Mobile menu button-->
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
          <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
          <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div on:click="{()=>location.href="/"}" style="cursor: pointer;" class="flex-shrink-0 flex font-bold text-white items-center">
          <span class="material-icons">
            lunch_dining
            </span>
            <h1 class="title">{ title }</h1>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="/admin" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Admin</a>

            <a on:click="{()=>location.href="/deals"}" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</a>

            <a href="/reviews" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reviews</a>

            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button on:click="{toggleDarkMode}" type="button" class="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span class="sr-only">Toggle Dark Mode</span>
          <!-- Heroicon name: outline/bell -->
          <span id="notificationBell" class="hidden motion-safe:animate-bounce absolute rounded-full p-1.5 bg-red-500"></span>
          {#if mode == 'light'}
            <span class="h-6 w-6 material-icons" style="vertical-align: bottom;">
              dark_mode
            </span>
          {:else}
            <span class="h-6 w-6 material-icons" style="vertical-align: bottom;">
              light_mode
            </span>
          {/if}
        </button>

        <div class="ml-3 relative">
          <button on:click={showCart} type="button" class="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">Show Cart</span>
            <!-- Heroicon name: outline/bell -->
            <span id="notificationCart" class="hidden motion-safe:animate-bounce absolute rounded-full p-1.5 bg-red-500"></span>
            <span class="material-icons mt-1 w-6">
              shopping_cart
              </span>
            
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  {#if isMobile}
  <div in:fly="{{ y: -200, duration: 500 }}" out:fly="{{ y: -200, duration: 500 }}" class="transition-all ease-in-out delay-150" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      <a href="/admin" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Admin</a>

      <a on:click="{()=>location.href="/deals"}" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Menu</a>

      <a href="/reviews" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reviews</a>

      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
    </div>
  </div>
  {/if}
</nav>

<style>
.title {
  padding-left: 5px;
}
</style>