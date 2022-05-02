<script context="module">

    import { getAllProducts } from "$lib/config/controllers";

    export async function load({ fetch }) {
      const res = await fetch('/api')
      const dealRes = await fetch('/api/deals')
  
      const { dealArray } = await dealRes.json()
      const products = await getAllProducts();
      
      if (res.ok) {
        return {
          props: {
            products,
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
    import Canva from "$lib/deals";

    export let products, dealArray;
    console.log(dealArray, products)

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', 400);
    canvas.setAttribute('height', 250);
    //const canvas = document.querySelector('#canvas')

    let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png", "sdrink.png"]; // list of image URLs
    const images = []; /// array to hold images.
    let imageCount = 0; // number of loaded images;

    imageURL.forEach(src => { 
         const image = new Image();
         image.src = `../../${src}`;
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


</script>

<!-- Generating images via canvas -->
<!-- <canvas id="canvas" class="hidden" width="400" height="250"></canvas> -->

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-black">Deals</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          You can create or edit new deals on this page and decide which ones to appear on your Menu. 
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {#each dealArray as da, i}
         <div class="relative w-full bg-gray-800 dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
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
                     <button on:click={ ()=>console.log(da.id, da.title, da.price) } class="adddealbutton absolute bottom-0 rounded-full bg-indigo-500 dark:bg-dark-indigo text-white drop-shadow-xl hover:bg-indigo-700">
                         <span class="material-icons">
                             edit
                             </span>
                     </button>
                 </div>
                 
             </div>
         </div>
         {/each}


     </div>


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


    @media only screen and (max-width: 920px) {
	  div#menu {
			padding-left: 5rem;
	  }
	  
  }
</style>