<script>
  export let hideCart = true;
  import ErrorModal from "$lib/modals/errorModal.svelte"
  import ProfileModal from "$lib/modals/profileModal.svelte"
  import { fly, fade } from 'svelte/transition';
  import { cartItems } from "./stores.js";
  import { browser } from "$app/env";
  import { getSettings } from "$lib/config/controllers"

  let storedItems, checkoutArr;
  let delivery = 0, hideToast = true;

  const currency = import.meta.env.VITE_CURRENCY;

  // fetch delivery charges
  getSettings("delivery-charges").then(price => delivery = price)

  let toCheckout = false, showErrorModal, showProfileModal, errorMessage, errorFix;

  // watch for change in totalPrice and update accordingly
  $: totalPrice = (function() {
    let pp = 0;
    
    if (storedItems) {
      storedItems.forEach(e => {
        pp += (e.price * e.qnt)
    })
    }

    return pp;
})();

const handleOverlay = () => {
    hideCart = true;
}

const addToTotal = (val1, val2) => {
    let price = val1 * val2;
    return price;
}

const updateQnt = (type, index) => {
  let qnt = storedItems[index].qnt;
  
  if (type == 'inc') {
    if(!(qnt >= 9)) {
      totalPrice = 0;
      ++storedItems[index].qnt; // increment counter
    }
  }
  else { 
    if(!(qnt <= 1)) {
      totalPrice= 0;
      --storedItems[index].qnt; // decrement counter
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(storedItems));
}

const clearCart = () => {
  totalPrice = 0; // set total price to 0
  cartItems.set(null);
  localStorage.setItem('cartItems', [])
  document.querySelector('#notificationCart').classList.add('hidden'); // hide notification dot
}

const checkout = async () => {
  checkoutArr = [];
  toCheckout = true;
  const table = document.querySelector('#table-cart');
  
  table.childNodes.forEach(obj => checkoutArr.push(obj.dataset))

  if (delivery === 0) {
    showErrorModal = true; toCheckout = false;
    errorMessage = 'Something went wrong!'
    errorFix = 'Try again in a bit.'
    return;
  }

  showProfileModal = true;
  document.querySelector('#checkout-btn').disabled = true;
}

function convertCurrency(val){
        return (Math.floor(val*100).toFixed(0)/100).toFixed(2);
}

const postData = async (event) => {
  localStorage.setItem('info', JSON.stringify(event.detail))
  let contentObj = event.detail;
  contentObj.content = checkoutArr;

  const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.assign(contentObj))
        });

        

        if (res.status == 500) {
          showErrorModal = true;
          errorMessage = 'Inactive hours!'
          errorFix = 'Service is currently unavailable. Try again in active hours'
        } 

        else if (res.status == 400) {
          showErrorModal = true;
          errorMessage = 'Something went wrong!'
          errorFix = 'Try again after clearing the cart out.'
        }

        else {
          hideToast = false;    
          setTimeout(() => {
            hideToast = true; // wait explicitly for 5 seconds before toast disappears
        }, 5000)
        }

        // order placed successully
          toCheckout = false;
          clearCart();
          document.querySelector('#checkout-btn').disabled = false; // enable button

}

if (browser) {
  cartItems.subscribe( arr => {
      storedItems = arr ? JSON.parse(arr) : [];
  })
}

</script>

{#if !hideCart}

<!-- TOAST NOTIFICATION -->
{#if !hideToast}
<div id="toast-success" in:fly="{{ y: 200, duration: 500 }}" out:fly="{{ y: 0, duration: 500 }}" class="fixed z-40 bottom-5 left-5 flex items-center p-4 mb-4 w-full max-w-xs text-white rounded-lg shadow bg-gray-800" role="alert">
    <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-green-200">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
    </div>
    <div class="ml-3 text-sm font-normal">Order placed successully.</div>
    <button on:click="{()=>hideToast = true}" type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white dark:bg-gray-800 hover:bg-gray-700" data-collapse-toggle="toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
</div>
{/if}

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
  
          <div class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-dark-bg py-6 shadow-xl">
            <div class="px-4 sm:px-6 pt-14">
              <h2 class="text-lg font-medium text-gray-900 dark:text-dark-blue" id="slide-over-title">Proceed to Checkout</h2>
            </div>
            
            <ErrorModal
                bind:showErrorModal
                bind:errorMessage
                bind:errorFix
              />

            <ProfileModal
              on:info={postData}
              bind:showProfileModal
              bind:toCheckout
            />

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
									class="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-list-item-bg text-left text-xs font-semibold text-gray-600 dark:text-list-item uppercase tracking-wider">
									Items
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-list-item-bg text-left text-xs font-semibold text-gray-600 dark:text-list-item uppercase tracking-wider">
									Quantity
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-list-item-bg text-left text-xs font-semibold text-gray-600 dark:text-list-item uppercase tracking-wider">
									Price ({currency})
								</th>
							</tr>
						</thead>
						<tbody id="table-cart">
              {#each storedItems as item, i}
							<tr class="border-b border-gray-200 dark:border-dark-border" data-id="{item.id}" data-qnt="{item.qnt}" 
                data-size="{item.size}" data-type="{item.type}">
								<td class="px-5 py-5 bg-white dark:bg-dark-bg text-sm">
									<p class="text-gray-900 dark:text-dark-blue whitespace-no-wrap">{ item.title }</p>
								</td>
								<td class="flex align-center px-5 py-5 bg-white dark:bg-dark-bg text-sm">
                  <button on:click="{ ()=>updateQnt('inc', i) }" class="text-white round bg-blue-400 dark:bg-dark-blue-400 disabled:bg-gray-200 hover:bg-blue-500 dark:hover:bg-blue-800"><span class="text-sm material-icons">
                    add
                    </span></button>
                  
									<p class="text-gray-900 dark:text-dark-blue px-2 whitespace-no-wrap">
									{item.qnt}
                  </p>
                  <button on:click="{ ()=>updateQnt('dec', i) }" class="text-white round bg-blue-400 dark:bg-dark-blue-400 disabled:bg-gray-200 hover:bg-blue-500 dark:hover:bg-blue-800"><span class="text-sm material-icons">
                    remove
                    </span></button>
								</td>
								<td class="px-5 py-5 bg-white dark:bg-dark-bg text-sm dark:text-list-item-price">
									<span
                      class="relative inline-block px-3 py-1 font-semibold leading-tight">
                          <span aria-hidden
                            class="absolute inset-0 opacity-50 rounded-full"></span>
									<span class="relative">{ parseFloat(convertCurrency(addToTotal(item.qnt , item.price))) }</span>
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
						class="px-5 py-5 bg-white dark:bg-dark-bg border-t dark:border-dark-border flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span class="text-xs xs:text-sm text-gray-900" style="text-align: center;">
                          <div class="relative px-3 py-1 mb-2 font-semibold text-sm text-yellow-600 dark:text-light-yellow leading-tight">
                            Delivery Charges: <span class="font-normal delivery-val">{delivery} {currency}</span>
                          </div>
                            <span class="text-lg dark:text-dark-blue">Total Bill: </span><span
                            class="relative inline-block px-3 py-1 font-semibold text-lg text-green-900 dark:text-light-grn leading-tight">
                              <span aria-hidden
                                  class="absolute inset-0 bg-green-200 dark:bg-dark-green-bg opacity-50 rounded-full"></span>
                        
                              <!-- Set total price to 0 instead of NaN when cart is cleared -->
                                <span class="relative total-val">
                                  {#if storedItems.length === 0}
                                    0.00 {currency}
                                  {:else}
                                    { convertCurrency(totalPrice + delivery) } {currency}
                                  {/if}
                                </span>
                              </span>
                            </span>
						<div class="inline-flex mt-8 xs:mt-0">
							<button on:click="{clearCart}"
                                class="text-sm text-red-400 dark:text-light-red transition duration-150 hover:bg-red-100 dark:hover:bg-red-900 bg-white dark:bg-dark-bg font-semibold py-2 px-4 rounded-l">
                                Clear Cart
              </button>
							&nbsp; &nbsp;

              <!-- Disable Checkout if storedItems is null -->
							<button on:click="{checkout}" id="checkout-btn"
                                class:disabled-btn="{storedItems.length === 0}"
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 dark:hover:bg-indigo-800 bg-indigo-600 dark:bg-dark-indigo-button font-semibold py-2 px-4 rounded-r">
                                <span class:animate-spin="{toCheckout}" class:hidden="{!toCheckout}" class="material-icons" style="vertical-align: bottom;">loop</span>
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