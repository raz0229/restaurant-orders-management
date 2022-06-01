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
    import { db } from "$lib/config/app";
    import { doc, deleteDoc } from "firebase/firestore";
    import Canva from "$lib/deals";
    import EditDeal from "$lib/modals/editDeal.svelte";
    import { fade } from "svelte/transition";

    export let products, dealArray;
    let showEditModal = false, confirmDelete = false, pendingDelete;
    let deal_name, priority, discount, deal_id, productList, total, temp_total;

    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', 400);
    canvas.setAttribute('height', 250);
    //const canvas = document.querySelector('#canvas')

    let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png", "sdrink.png", "pasta.png", "dessert.png"]; // list of image URLs
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

    const editDeal = (id, title, prior, content, tot) => {
        deal_id = id;
        deal_name = title;
        priority = prior;
        productList = content;
        total = tot
        temp_total = tot
        showEditModal = true;
    }

    const deleteDeal = async (id, confirmed) => {
        pendingDelete = id;
        confirmDelete = true;

        if (confirmed) {
            // delte doc
            document.querySelector('#delete-spinner').classList.remove('hidden')
            try {
              await deleteDoc(doc(db, "deals", pendingDelete));
              location.href = '/admin/dashboard/deals'
            } catch (e) {
              document.querySelector('#delete-spinner').classList.add('hidden')  
            }
            
        }
    }

    const closeModal = () => {
        confirmDelete = false;
    }

</script>

<svelte:head>
  <title> Deals | Admin</title>
</svelte:head>

<!-- Delete Modal -->
{#if confirmDelete}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
  <div class="bg-white rounded-lg lg:w-1/2 sm:w-80 m-2">
    <div class="flex flex-col items-start p-4">
      <div class="flex items-center w-full">
        <div class="text-gray-800 font-medium text-lg">Delete Deal?</div>
		      <svg on:click="{closeModal}" class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" viewBox="0 0 18 18">
			      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
     	    </svg>
      </div>
      <hr>
      <div class="mt-2 mb-2 text-gray-600">You are about to delete this deal from your Deals page. Are you sure you want to continue?</div>
      <hr>
      <div class="ml-auto">
        <button on:click="{()=>deleteDeal(pendingDelete, true)}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <span id="delete-spinner" class="animate-spin material-icons hidden" style="vertical-align: bottom;">
                loop
            </span>
            Delete
        </button>
        <button on:click="{closeModal}" class="bg-transparent hover:bg-gray-300 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
{/if}


<!-- Generating images via canvas -->
<!-- <canvas id="canvas" class="hidden" width="400" height="250"></canvas> -->
<EditDeal
    bind:showEditModal
    bind:deal_id
    bind:deal_name
    bind:priority
    bind:productList
    bind:total
    bind:temp_total
    />

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">

    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="page-title-deals text-4xl font-semibold text-black">Deals</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          You can create or edit new deals on this page and decide which ones to appear on your Menu. 
        </p>
      </div>
    </div>

    <div class="text-center">
        <button  on:click="{()=>showEditModal = !showEditModal}" class="text-xl mt-12 mb-6 bg-indigo-600 dark:bg-dark-indigo-button border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
            <span class="material-icons" style="vertical-align: middle;">
                add_circle_outline
                </span>&nbsp;Create a Deal
        </button>
    </div>    

    <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {#each dealArray as da, i}
         <div
            class="relative w-full bg-gray-800 dark:bg-dark-card rounded-lg shadow-lg overflow-hidden flex flex-col justify-center items-center">
             <div class="ribbon font-bold text-white whitespace-no-wrap px-4">
                 <div class="label bg-red-ribbon dark:bg-dark-red-ribbon">{da.discount}% OFF</div>
             </div>
             <div on:click="{()=>deleteDeal(da.doc_id, false)}"
                class="absolute shadow-lg z-20 left-2 top-2 cursor-pointer bg-red-600 text-white p-2 rounded hover:bg-red-700">
                <span class="material-icons" style="vertical-align: bottom;">
                    delete_outline
                    </span>
             </div>
             <div class="zoom">
                 <img class="canva object-center object-cover h-auto w-full" id="canvasimg{i}" src="" alt="photo">
             </div>
             
             <div class="flex justify-between w-64">
                 
                 <div class="py-8 sm:py-6">
                    <p class="text-xs text-white bg-red-800 rounded w-16 text-center"><strong>Priority:</strong>&nbsp{ da.id }</p>
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
                     <button on:click={ ()=>editDeal(da.doc_id, da.title, da.id, da.content, da.price) } class="adddealbutton absolute bottom-0 rounded-full bg-indigo-500 dark:bg-dark-indigo text-white drop-shadow-xl hover:bg-indigo-700">
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
.bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
}

</style>