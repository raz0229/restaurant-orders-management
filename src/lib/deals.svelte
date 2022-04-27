<script>
import { browser } from "$app/env";
import { onMount } from "svelte";
import Canva from "./deals";
import { cartItems } from "./stores"

export let dealArray;
export let hideCart;
export let showButton = false;
// MAX_DEALS can only be an integer between 3 and deals.length
export let MAX_DEALS = 1; // set to 1 for deals.length
let canvas;
let storedItems;

// how many deals to display
    if (!(MAX_DEALS > dealArray.length) && !(MAX_DEALS < 3)) dealArray.length = MAX_DEALS;
//else MAX_DEALS = dealArray.length // default behavior


onMount(() => {

if (browser) {

    cartItems.subscribe( arr => {
        storedItems = arr ? JSON.parse(arr) : [];
    })

    canvas = document.querySelector('#canvas')

    let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png", "sdrink.png"]; // list of image URLs
    const images = []; /// array to hold images.
    let imageCount = 0; // number of loaded images;

    imageURL.forEach(src => { 
         const image = new Image();
         image.src = src;
         image.onload = ()=>{ 
             imageCount++;
             if(imageCount === imageURL.length){ // have all loaded?
                 // start rendering all deals
                 for (let i in dealArray) {
                    new Canva(canvas, document.querySelector(`#canvasimg${i}`), dealArray[i].deal).loadDeal(images);
                 }
                console.log('loaded all deals')
             }
         }
         images.push(image);
    });
}

})

// send items to cart
const showNotificationOnCart = (id, title, price) => {
    document.querySelector('#notificationCart').classList.remove('hidden');
    hideCart = false;

    // cant add the same item to cart twice
    if (!storedItems.find(n=>n.id==id)) {
        storedItems.push({
        id,
        size: 'st',
        type: 'deal',
        title,
        qnt: 1,
        price
        })
    }
    // stored in browser's localStorage
    cartItems.set(JSON.stringify(storedItems))
    localStorage.setItem('cartItems', JSON.stringify(storedItems));
}
const showNotificationOnBell = () => {
    document.querySelector('#notificationBell').classList.remove('hidden');
}

</script>

<!-- Generating images via canvas -->
<canvas id="canvas" class="hidden" width="400" height="250"></canvas>

<div class="w-full mt-9 bg-transparent">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600 dark:text-light-p">
                Hottest deals that are updated daily
            </h2>
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-light-header">
                Check our latest for the best price            
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

           {#each dealArray as da, i}
            <div class="relative w-full bg-gray-800 dark:bg-std-black-bg rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label bg-red-ribbon dark:bg-dark-red-ribbon">{da.discount}% OFF</div>
                </div>
                <div class="zoom">
                    <img class="canva object-center object-cover h-auto w-full" id="canvasimg{i}" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">{da.title}</p>
                        <ul class="list-disc">
                            {#each da.content as dc} 
                            <li class="text-base text-gray-400 dark:text-dark-p font-normal">{dc}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="relative py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">{da.price}</p>
                        <span class="text-base text-gray-400 dark:text-dark-p font-normal">PKR</span>
                        <button on:click={ ()=>showNotificationOnCart(da.id, da.title, da.price) } class="adddealbutton absolute bottom-0 rounded-full bg-indigo-500 dark:bg-dark-indigo text-white drop-shadow-xl hover:bg-indigo-700">
                            <span class="material-icons">
                                add_shopping_cart
                                </span>
                        </button>
                    </div>
                    
                </div>
            </div>
            {/each}


        </div>
        
        {#if showButton}
        <div class="text-center">
            <button  on:click="{()=>location.href='/deals'}" class="text-xl mt-12 bg-indigo-600 dark:bg-dark-indigo-button border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
                Load all deals
            </button>
        </div>
        {/if}

    </section>
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

    .adddealbutton {
    padding: 10px;
    bottom: 1rem;
    }

    .canva {
        width: 440px;
    }

.ribbon {
position: absolute;
z-index: 10;
display: block;
top: -4px;
right: 0;
width: 110px;
height: 110px;
overflow: hidden;
}

.ribbon .label {
position: relative;
display: block;
left: -20px;
top: 23px;
width: 158px;
padding: 10px 0;
font-size: 15px;
text-align: center;
color: #fff;
-webkit-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-moz-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-ms-box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
box-shadow: 0px 0px 4px rgba(0,0,0,0.3);
-webkit-transform: rotate(45deg) translate3d(0,0,0);
-moz-transform: rotate(45deg) translate3d(0,0,0);
-ms-transform: rotate(45deg) translate3d(0,0,0);
transform: rotate(45deg) translate3d(0,0,0);
}

.label:before, .label:after {
content: '';
position: absolute;
bottom: -4px;
border-top: 4px solid #a71c26;
border-left: 4px solid transparent;
border-right: 4px solid transparent;
}

.label:before {
left: 0;
}

.label:after {
right: 0;
}


</style>