<script>
import { browser } from "$app/env";
import { onMount } from "svelte";
import Canva from "./deals";

export let hideCart;
export let showButton = false;
// MAX_DEALS can only be an integer between 3 and deals.length
export let MAX_DEALS = 1; // set to 1 for deals.length
let canvas;

let dealArray = [
    {
        title: "Today's Special",
        price: 1350,
        discount: 20,
        content: [
            "1 Large Pizza",
            "10 Hot Wings",
            "1.5 litre drink"
        ],
        deal: {
            hotwings: 1,
            pizza: 1,
            drink: 1
        }
    },
    {
        title: "Regular Deal 1",
        price: 1600,
        discount: 10,
        content: [
            "1 Large Pizza",
            "1 Medium Pizza",
            "1.5 litre drink"
        ],
        deal: {
            pizza: 1,
            mpizza: 1,
            drink: 1
        }
    },
    {
        title: "Regular Deal 2",
        price: 1050,
        discount: 15,
        content: [
            "1 Medium Pizza",
            "10 Hot Wings",
            "1 litre drink"
        ],
        deal: {
            hotwings: 1,
            mpizza: 1,
            drink: 1
        }
    },
    {
        title: "Regular Deal 3",
        price: 1850,
        discount: 25,
        content: [
            "2 Large Pizza",
            "1.5 litre drink"
        ],
        deal: {
            pizza: 2,
            drink: 1
        }
    },
    {
        title: "Banger Deal 1",
        price: 3300,
        discount: 9,
        content: [
            "2 Large Pizza",
            "3 Zinger Burgers",
            "20 Hot wings",
            "1.5 litre drinks (2)"
        ],
        deal: {
            hotwings: 2,
            pizza: 2,
            drink: 2,
            zinger: 3
        }
    },
    {
        title: "Banger Deal 2",
        price: 5300,
        discount: 18,
        content: [
            "3 Large Pizza",
            "20 Chicken Nuggets",
            "1.5 litre drinks (3)",
            "5 Zinger Burgers",
            "2 Family Fries"
        ],
        deal: {
            hotwings: 1,
            pizza: 3,
            drink: 3,
            nuggets: 2,
            zinger: 5,
            fries: 2
        }
    },
    {
        title: "Banger Deal 3",
        price: 4500,
        discount: 20,
        content: [
            "3 Large Pizza",
            "20 Chicken Nuggets",
            "1 litre drink (2)",
            "2 Zinger Burgers",
            "1 Family Fries"
        ],
        deal: {
            pizza: 3,
            sdrink: 2,
            nuggets: 2,
            zinger: 2,
            fries: 1
        }
    },
    {
        title: "Special Deal 1",
        price: 2300,
        discount: 10,
        content: [
            "1 Large Pizza",
            "1 Medium Pizza",
            "1 Family Fries",
            "1.5 litr drink"
        ],
        deal: {
            pizza: 1,
            mpizza: 1,
            drink: 1,
            fries: 1,
        }
    },
    {
        title: "Special Deal 2",
        price: 2600,
        discount: 12,
        content: [
            "1 Large Pizza",
            "20 Chicken Nuggets",
            "1.5 litre drink",
            "2 Zinger Burgers"
        ],
        deal: {
            pizza: 1,
            drink: 1,
            nuggets: 2,
            zinger: 2
        }
    }
]

// how many deals to display
if (!(MAX_DEALS > dealArray.length) && !(MAX_DEALS < 3)) dealArray.length = MAX_DEALS;
//else MAX_DEALS = dealArray.length // default behavior

onMount(() => {

if (browser) {
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

const showNotificationOnCart = () => {
    document.querySelector('#notificationCart').classList.remove('hidden');
    hideCart = false;
}
const showNotificationOnBell = () => {
    document.querySelector('#notificationBell').classList.remove('hidden');
}

</script>

{#each dealArray as x}
<p></p>
{/each}

<!-- Generating images via canvas -->
<canvas id="canvas" class="hidden" width="400" height="250"></canvas>

<div class="w-full mt-9 bg-white dark:bg-gray-800">
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div class="text-center pb-12">
            <h2 class="text-base font-bold text-indigo-600">
                Hottest deals that are updated daily
            </h2>
            <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-800 dark:text-white">
                Check our latest for the best price            
            </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">


           {#each dealArray as da, i}
            <div class="relative w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
                <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                    <div class="label">{da.discount}% OFF</div>
                </div>
                <div>
                    <img class="canva object-center object-cover h-auto w-full" id="canvasimg{i}" src="" alt="photo">
                </div>
                <div class="flex justify-between w-64">
                    <div class="py-8 sm:py-6">
                        <p class="text-xl text-white font-bold mb-2">{da.title}</p>
                        <ul class="list-disc">
                            {#each da.content as dc} 
                            <li class="text-base text-gray-400 font-normal">{dc}</li>
                            {/each}
                        </ul>
                    </div>
                    <div class="relative py-8 sm:py-6">
                        <p class="text-3xl text-white font-bold">{da.price}</p>
                        <span class="text-base text-gray-400 font-normal">PKR</span>
                        <button on:click={ showNotificationOnCart } class="adddealbutton absolute bottom-0 rounded-full bg-indigo-500 text-white drop-shadow-xl hover:bg-indigo-700">
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
            <button  on:click="{()=>location.href='/deals'}" class="text-xl mt-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
                Load all deals
            </button>
        </div>
        {/if}

    </section>
</div>

<style>

    .adddealbutton {
    padding: 10px;
    bottom: 1rem;
    }

    .canva {
        width: 440px;
    }

.ribbon {
position: absolute;
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
background-color: #e85e68;
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