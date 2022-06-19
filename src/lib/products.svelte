<script>
    import { cartItems } from "./stores"
    import { browser } from "$app/env"
    import { fly } from "svelte/transition"

    export let groups;
    let storedItems;
    let hideToast = true;

    const currency = import.meta.env.VITE_CURRENCY;

    // sort array based on priority
    groups.sort((a,b)=>a.priority - b.priority);

    const sendToCart = (e, arr=['','','']) => {
        document.querySelector('#notificationCart').classList.remove('hidden'); // show notification

        let price = 0, title = '';
        let set = e.target.parentNode.parentNode?.childNodes[2].dataset
        
        switch (set.size) {
            case 's':   // size is small
                price = set.priceS; title = `${set.title} (${arr[0]})`;
                break;
            case 'm':   // size is medium
                price = set.priceM; title = `${set.title} (${arr[1]})`;
                break;
            case 'l':   // size is large
                price = set.priceL; title = `${set.title} (${arr[2]})`;
                break;
            default:    // size is static
                price = set.price; title = `${set.title}`;
                break;
        }

        // check if item already exists in cart
        if (!storedItems.find(n=>n.id==set.id)) {
            storedItems.push({
                id: set.id,
                size: set.size,
                type: 'product',
                title,
                qnt: 1,
                price
            })
        }
        
        // stored in browser's localStorage
        cartItems.set(JSON.stringify(storedItems))
        localStorage.setItem('cartItems', JSON.stringify(storedItems));
        
        hideToast = false;    
        setTimeout(() => {
            hideToast = true; // wait explicitly for 5 seconds before toast disappears
        }, 5000)
    
    }

    /* DOM Magic 🪄 */
    const sizeSet = (t, e) => {
        let price;
        // set data-size to provided size {'l', 'm', 's'}
        e.target.parentNode.parentNode.dataset.size = t

        if (t == 'l') price = e.target.parentNode.parentNode.dataset.priceL
        else if (t == 'm') price = e.target.parentNode.parentNode.dataset.priceM
        else price = e.target.parentNode.parentNode.dataset.priceS

        e.target.parentNode.parentNode.childNodes[2].textContent = `${price} ${currency}`;
    }

    const validateSize = (val, size) => {
        return (!val || val.trim().length === 0) ? size : val;
    }

    if (browser) {
        cartItems.subscribe( arr => {
            storedItems = arr ? JSON.parse(arr) : [];
        })
    }
    
</script>

<div class="bg-white dark:bg-dark-bg">
    <main class="my-8">
        <div class="relative container mx-auto px-6">
            
            <div class="mt-16">
                <div class="text-center pb-12">
                    <h2 class="text-base font-bold text-indigo-600 dark:text-light-p">
                        Add individual items into cart
                    </h2>
                    <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-light-header">
                        Variety of flavors for everybody             
                    </h1>
                </div>

            <!-- TOAST NOTIFICATION -->
            {#if !hideToast}
                <div id="toast-success" in:fly="{{ y: 200, duration: 500 }}" out:fly="{{ y: 0, duration: 500 }}" class="fixed z-40 bottom-5 left-5 flex items-center p-4 mb-4 w-full max-w-xs text-white rounded-lg shadow bg-gray-800" role="alert">
                    <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg text-green-200">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    </div>
                    <div class="ml-3 text-sm font-normal">Item added to Cart.</div>
                    <button on:click="{()=>hideToast = true}" type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white dark:bg-gray-800 hover:bg-gray-700" data-collapse-toggle="toast-success" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            {/if}

        
        {#each groups as group}
        <h3 class="mt-14 text-gray-600 dark:text-list-item text-2xl font-medium">
            <span class="material-icons">
                star_border
                </span>&nbsp;{ group.title }</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {#each group.products as item}
                    
                    <div class="product w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div on:click="{()=>sendToCart(event, group.sizes)}" class="zoom flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('{ item.img }')">
                            <button class="p-2 rounded-full bg-indigo-500 dark:bg-dark-indigo text-white mx-5 -mb-4 hover:bg-indigo-700 hover:dark:bg-indigo-800 focus:outline-none focus:bg-indigo-500">
                                <span style="pointer-events: none;" class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>

                        {#if item.prices.length === 1}
                        <div class="px-5 py-3 size-check" data-title="{item.title}"
                        data-id="{item._id}" data-price="{item.prices[0]}" data-size="st">
                            <h3 class="text-gray-700 dark:text-review-title uppercase">{item.title}</h3>
                            <span class="text-gray-500 dark:text-dark-p mt-2">{item.prices[0]} {currency}</span>
                            <div class="size">
                                <span class="sizes static">S</span>
                                <span class="sizes static">M</span>
                                <span class="sizes static">L</span>
                            </div>
                        </div>
                        {:else if item.prices.length === 2}
                        <div class="px-5 py-3 size-check" data-size="m" data-title="{item.title}"
                        data-id="{item._id}" data-price-s="{item.prices[0]}" data-price-m="{item.prices[1]}">
                            <h3 class="text-gray-700 dark:text-review-title uppercase">{item.title}</h3>
                            <span class="text-gray-500 dark:text-dark-p mt-2">{item.prices[1]} {currency}</span>
                            <div class="size">
                                <span class="sizes" on:click="{()=>sizeSet('s', event)}">{ validateSize(group.sizes[0], 'S') }</span>
                                <span class="sizes" on:click="{()=>sizeSet('m', event)}">{ validateSize(group.sizes[1], 'M') }</span>
                                <span class="sizes static">L</span>
                            </div>
                        </div>
                        {:else}
                        <div class="px-5 py-3 size-check" data-size="l" data-title="{item.title}"
                        data-id="{item._id}" data-price-s="{item.prices[0]}" data-price-m="{item.prices[1]}" data-price-l="{item.prices[2]}">
                            <h3 class="text-gray-700 dark:text-review-title uppercase">{item.title}</h3>
                            <span class="text-gray-500 dark:text-dark-p mt-2">{item.prices[2]} {currency}</span>
                            <div class="size">
                                <span class="sizes" on:click="{()=>sizeSet('s', event)}">{ validateSize(group.sizes[0], 'S') }</span>
                                <span class="sizes" on:click="{()=>sizeSet('m', event)}">{ validateSize(group.sizes[1], 'M') }</span>
                                <span class="sizes" on:click="{()=>sizeSet('l', event)}">{ validateSize(group.sizes[2], 'L') }</span>
                            </div>
                        </div>
                        {/if}

                    </div>
                    
                    {/each}

                </div>
        {/each}


                <!-- Hidden data members to make the CSS work for some strange reason -->

                <div class="hidden size-check" data-size="s">
                    <div class="size">
                        <span class="sizes"></span><span class="sizes"></span><span class="sizes"></span>
                    </div>
                </div>
                <div class="hidden size-check" data-size="m">
                    <div class="size">
                        <span class="sizes"></span><span class="sizes"></span><span class="sizes"></span>
                    </div>
                </div>
                <div class="hidden size-check" data-size="l">
                    <div class="size">
                        <span class="sizes"></span><span class="sizes"></span><span class="sizes"></span>
                    </div>
                </div>


            </div>
        </div>
    </main>

</div>

<style>
.zoom {
    transition: transform 0.2s;
}

.zoom:hover {
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1); 
}
div.size {
    position: relative;
}
div.size .sizes {
    position: absolute;
    cursor: pointer;
    width: 2rem;
    text-align: center;
    padding: 3px;
    border-radius: 20%;
    font-size: 1rem;
    font-weight: bold;
    color: rgb(99 102 241);
    border: solid 2px rgb(99 102 241);
    bottom: -0.3rem;
    transition: all 0.3s ease;
}
.dark div.size .sizes {
    color: #999ae6;
    border: solid 2px #2c2eaf;
}
div.size .static {
    cursor: not-allowed;
    color: #b9b9b9;
    border: solid 2px #b9b9b9;
}
.dark div.size .static {
    cursor: not-allowed;
    color: #b9b9b9;
    border: solid 2px #5e5e5e;
}
div.size .sizes:hover:not(.static:hover) {
    background-color: rgb(99 102 241);
    color: #f7f7f7;
}
.dark div.size .sizes:hover:not(.static:hover) {
    background-color: #2c2eaf;
    color: #f7f7f7;
}
div.size .sizes:first-child {
    right: 5.4rem;
}
div.size .sizes:nth-child(2) {
    right: 3.2rem;
}
div.size .sizes:nth-child(3) {
    right: 1rem;
}

.size-check[data-size='s'] .sizes:first-child,
.size-check[data-size='m'] .sizes:nth-child(2),
.size-check[data-size='l'] .sizes:nth-child(3) {
    background-color: rgb(99 102 241);
    color: #f7f7f7;
}

.dark .size-check[data-size='s'] .sizes:first-child,
.dark .size-check[data-size='m'] .sizes:nth-child(2),
.dark .size-check[data-size='l'] .sizes:nth-child(3) {
    background-color: #2c2eaf;
    color: #f7f7f7;
}
 
</style>