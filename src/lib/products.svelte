<script>
    export let loaded;
    export let products;
    export let cartItems;

    let waiting = 0
    
    const notifyLoaded = () => {
        console.log('loaded all resources')
        //loaded = true;
    }
    
    const onload = el => {
        waiting++
        el.addEventListener('load', () => {
            waiting--
            if (waiting === 0) {
                notifyLoaded()
            }
        })
    }

    const sendToCart = () => {
        
    }
    
</script>

<div class="bg-white">
    <main class="my-8">
        <div class="container mx-auto px-6">
            
            <div class="mt-16">
                <div class="text-center pb-12">
                    <h2 class="text-base font-bold text-indigo-600">
                        Add individual items into cart
                    </h2>
                    <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-white">
                        Variety of flavors for everybody             
                    </h1>
                </div>



<!--Regular Pizzas-->


                <h3 class="text-gray-600 text-2xl font-medium">Regular Pizzas</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    
                    {#each products as item}
                    {#if item.id.substring(0,2) == "00"}
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="zoom flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('{ item.img }')">
                            <button class="p-2 rounded-full bg-indigo-500 text-white mx-5 -mb-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-500">
                                <span class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{item.title}</h3>
                            <span class="text-gray-500 mt-2">{item.priceM} PKR</span>
                        </div>
                    </div>
                    {/if}
                    {/each}

                </div>



<!--Cafe's Special Pizzas-->


                <h3 class="mt-14 text-gray-600 text-2xl font-medium">Cafe's Special Pizzas</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {#each products as item}
                    {#if item.id.substring(0,2) == "01"}
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="zoom flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('{ item.img }')">
                            <button class="p-2 rounded-full bg-indigo-500 text-white mx-5 -mb-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-500">
                                <span class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{item.title}</h3>
                            <span class="text-gray-500 mt-2">{item.priceM} PKR</span>
                        </div>
                    </div>
                    {/if}
                    {/each}
                </div>



<!--Cafe's treats (Hotwings, nuggets)-->
                
                <h3 class="mt-14 text-gray-600 text-2xl font-medium">Cafe's Treats</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {#each products as item}
                    {#if item.id.substring(0,2) == "02"}
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="zoom flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('{ item.img }')">
                            <button class="p-2 rounded-full bg-indigo-500 text-white mx-5 -mb-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-500">
                                <span class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{item.title}</h3>
                            <span class="text-gray-500 mt-2">{item.priceM} PKR</span>
                        </div>
                    </div>
                    {/if}
                    {/each}

                </div>


<!--EXTRAS (Hamburger, Cold drinks and french fries)-->


                <h3 class="mt-14 text-gray-600 text-2xl font-medium">Extras</h3>
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                    {#each products as item}
                    {#if item.id.substring(0,2) == "03"}
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="zoom flex items-end justify-end h-56 w-full bg-cover" style="background-image: url('{ item.img }')">
                            <button class="p-2 rounded-full bg-indigo-500 text-white mx-5 -mb-4 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-500">
                                <span class="material-icons">add_shopping_cart</span>
                            </button>
                        </div>
                        <div class="px-5 py-3">
                            <h3 class="text-gray-700 uppercase">{item.title}</h3>
                            <span class="text-gray-500 mt-2">{item.price} PKR</span>
                        </div>
                    </div>
                    {/if}
                    {/each}
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
</style>