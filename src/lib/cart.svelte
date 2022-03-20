<script>
  export let hideCart = true;
  import { fly, fade } from 'svelte/transition';
  import { cartItems } from "./stores.js"
  import { browser } from "$app/env"

  let storedItems;
  let totalPrice = 0;

const handleOverlay = () => {
    hideCart = true;
}

const addToTotal = (val1, val2) => {
    totalPrice = 0;
    totalPrice += val1 * val2;
    return val1 * val2;
}

const updateQnt = (type, index) => {
  let qnt = storedItems[index].qnt;
  
  if (type == 'inc') {
    if(!(qnt >= 9)) ++storedItems[index].qnt; // increment counter
  }
  else { 
    if(!(qnt <= 1)) --storedItems[index].qnt; // decrement counter
  }

  localStorage.setItem("cartItems", JSON.stringify(storedItems));
}

const clearCart = () => {
  cartItems.set(null);
  localStorage.setItem('cartItems', [])
  document.querySelector('#notificationCart').classList.add('hidden'); // hide notification dot
}

if (browser) {
  cartItems.subscribe( arr => {
      storedItems = arr ? JSON.parse(arr) : [];
  })
}


</script>


{#if !hideCart}
<div class="fixed inset-0 z-30" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="absolute inset-0">
      <div in:fade out:fade class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" on:click={handleOverlay} aria-hidden="true"></div>
      <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
        
        <div in:fly="{{ x: 200, duration: 1000 }}" out:fade class="relative w-screen max-w-md">
        
          <div class="absolute top-0 left-0 -ml-8 flex pt-20 pr-2 sm:-ml-10 sm:pr-4" on:click="{ handleOverlay }">
            <button type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="sr-only">Close panel</span>
              <!-- Heroicon name: outline/x -->
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
            <div class="px-4 sm:px-6 pt-14">
              <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Proceed to Checkout</h2>
            </div>
            
            







            <!-- component -->
<div class="lg:p-8 p-4 rounded-md w-full">
		<div>
			<div class="-mx-4 sm:-mx-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {#if storedItems}
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Items
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Quantity
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Price (PKR)
								</th>
							</tr>
						</thead>
						<tbody>
              {#each storedItems as item, i}
							<tr class="border-b border-gray-200">
								<td class="px-5 py-5 bg-white text-sm">
									<p class="text-gray-900 whitespace-no-wrap">{ item.title }</p>
								</td>
								<td class="flex align-center px-5 py-5 bg-white text-sm">
                  <button on:click="{ ()=>updateQnt('inc', i) }" class="text-white round bg-blue-400 disabled:bg-gray-200 hover:bg-blue-500"><span class="text-sm material-icons">
                    add
                    </span></button>
                  
									<p class="text-gray-900 px-2 whitespace-no-wrap">
									{item.qnt}
                  </p>
                  <button on:click="{ ()=>updateQnt('dec', i) }" class="text-white round bg-blue-400 hover:bg-blue-500"><span class="text-sm material-icons">
                    remove
                    </span></button>
								</td>
								<td class="px-5 py-5 bg-white text-sm">
									<span
                      class="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span aria-hidden
                            class="absolute inset-0 opacity-50 rounded-full"></span>
									<span class="relative">{ addToTotal(item.qnt , item.price) }</span>
									</span>
								</td>
							</tr>
              {/each}
						</tbody>
					</table>
          {:else}
          <p class="text-red-500 px-6 text-xl mb-4 text-center whitespace-no-wrap"><em>Your Cart is empty!</em></p>
          {/if}
					<div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span class="text-xs xs:text-sm text-gray-900">
                            <span class="text-lg">Total Bill: </span><span
                            class="relative inline-block px-3 py-1 font-semibold text-lg text-green-900 leading-tight">
                              <span aria-hidden
                                  class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        
                              <!-- Set total price to 0 instead of NaN when cart is cleared -->
                                <span class="relative">
                                  {#if storedItems.length === 0}
                                    0 PKR
                                  {:else}
                                    { totalPrice } PKR
                                  {/if}
                                </span>
                              </span>
                            </span>
						<div class="inline-flex mt-8 xs:mt-0">
							<button on:click="{clearCart}"
                                class="text-sm text-red-400 transition duration-150 hover:bg-red-100 bg-white font-semibold py-2 px-4 rounded-l">
                                Clear Cart
                            </button>
							&nbsp; &nbsp;

              <!-- Disable Checkout if storedItems is null -->
							<button class:disabled-btn="{!storedItems}"
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Checkout
                            </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

















          </div>
        </div>
      </div>
    </div>
  </div>
  {/if}

  <style>

    .disabled-btn {
      pointer-events: none;
      background-color: rgba(150, 150, 150, 0.2);
      color: #fff;

    }

    .round {
      border-radius: 50%;
      width: 22px;
    }

    .align-center {
      align-items: center;
    }

     .pea {
       pointer-events: all !important;
     }

::-webkit-scrollbar {
    width: 8px;
    height: 10px;

  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #c2c9d2;
  }
  /* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
  </style>