<script>
    export let showEditModal = false;

    import { fade } from "svelte/transition"
    import Canva from "$lib/deals";

    let deal_name, item_name, item_price, item_qnt, item_type, errorMessage = '';
    export let productList = [];
    let extras = 0, discount = 0;

    const properties = Canva.getProperties()

    $: total = (() => {
        let pp = 0;
    
        if (productList.length != 0) {
            productList.forEach(e => {
            pp += (e.price + extras) - discount
        })
    }

    return pp;
    })();

    const updatePreview = () => {
        const canvas = document.querySelector('#preview')

        let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png", "sdrink.png"]; // list of image URLs
        const images = []; /// array to hold images.
        const deal = getCurrentDeal()
        
        let imageCount = 0; // number of loaded images;

        imageURL.forEach(src => { 
             const image = new Image();
            image.src = `../../${src}`;
            image.onload = ()=>{ 
                imageCount++;
                if(imageCount === imageURL.length){ // have all loaded?
                 // start rendering
                    new Canva(canvas, document.querySelector(`#canvaspreview`), deal).loadDeal(images);
                    
                }
            }
            images.push(image);
        });
        }

    const productManager = () => {
        if (!productList.find(item => item.title == item_name.trim().toLowerCase() && item.type == item_type)) {
            productList = [...productList, {
                title: item_name.trim().toLowerCase(),
                price: item_price,
                qnt: item_qnt,
                type: item_type
            }]
            item_name = ''; item_price = ''; item_qnt = '';
        }
        updatePreview();
    }
    
    const capitalize = (mySentence) => {
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");
    }

    const getCurrentDeal = () => {
        let deal = productList.reduce(
            (obj, item) => Object.assign(obj, { [item.type]: item.qnt }), {});
        return deal;
    }

    const submitHandler = () => {
        console.log('prssed')
        
    }

    const clearDeal = () => {
        errorMessage = '';
        deal_name = '';
        productList = [];
        showEditModal = false;
    }

</script>

{#if showEditModal}

<canvas id="preview" class="hidden" width="400" height="250"></canvas>

<div  in:fade out:fade class="fixed top-0 z-20 min-h-screen flex items-center w-full justify-center bg-gray-200/50 dark:bg-semi-gray py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute bg-black opacity-60 inset-0 z-30"></div>
    <div class="modal-body mt-6 max-w-md w-full space-y-8 p-10 bg-white dark:bg-dark-bg rounded-xl shadow-lg z-40">
    <div class="grid  gap-8 grid-cols-1">
    <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-semibold dark:text-dark-p dark:placeholder:text-input-border text-lg mr-auto">Add a Deal</h2>
                <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div class="mt-5">
                <div class="form">
                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                        <div class="mb-3 space-y-2 w-full text-xs">
                            <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Preview</label>
                            <!-- PREVIEW -->
                            <img class="canva rounded border border-gray-200 object-center object-cover h-auto w-full" id="canvaspreview" src="../../fallback.png" alt="PREVIEW HERE">
                        </div>
                    </div>

                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Deal's Name</label>
                                <input placeholder="Name of deal" type="text" bind:value="{deal_name}" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                
                            </div>
                        </div>
                        
                            <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                <div class="relative flex-auto w-full mb-1 text-xs space-y-2">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Add Product</label>
                                    <form on:submit|preventDefault="{productManager}">
                                        <input
                                        id="text-box" bind:value="{item_name}" required="required" name="name" 
                                        class="w-full appearance-none block bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg p-3" placeholder="Item's Name">
                                        <div class="md:flex flex-row mt-2 md:space-x-4 w-full text-xs">
                                            <input bind:value="{item_price}"
                                                required="required" name="price" type="number" min="0"
                                                class="w-full appearance-none block mb-2 bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg  py-2 px-2" placeholder="Price">
                                            <input bind:value="{item_qnt}"
                                                required="required" name="qnt" type="number" min="1" max="9"
                                                class="w-full appearance-none block mb-2 bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg  py-2 px-2" placeholder="Quantity">                                
                                        </div>
                                        <div class="md:flex flex-row mt-2 mb-2 md:space-x-4 w-full text-xs">
                                            <div class="space-y-2 p-1 w-full text-sm">
                                                <label class="text-gray-600 dark:text-dark-p dark:placeholder:text-input-border">Type: </label>
                                            </div>
                                            <div class="mb-2 space-y-2 w-full text-xs">
                                                <select name="type" id="type" bind:value="{item_type}" 
                                                    class="p-2 bg-gray-100">
                                                    {#each properties as prop}
                                                        <option value="{prop.val}">{prop.name}</option>
                                                    {/each}
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" 
                                        class="rounded-none bg-indigo-600 hover:bg-indigo-800 disabled:bg-gray-300 text-white p-2 w-full">Add Product</button>
                                   
                                    </form>
                                </div>
                                <div class="w-full flex flex-col mb-3">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Price Calculator</label>
                                    <div class="text-gray-500 text-md mr-6" style="text-align: end;" >
                                        
                                        {#each productList as product}
                                        <div class="md:flex flex mt-2 md:space-x-4 w-full text-xs">    
                                            <div class="flex-3 mb-1 space-y-2 w-full text-xs" style="text-align: start;">
                                                <p>{product.qnt} {capitalize(product.title)}(s)</p>    
                                            </div>
                                            <div class="flex-1 mb-1 space-y-2 w-full text-xs">
                                                <p>{product.price}</p>
                                            </div>
                                        </div>
                                        {/each}

                                        <div class="md:flex flex-row mt-2 md:space-x-4 w-full text-xs">
                                            <div class="mb-1 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Extras: </label>
                                            </div>
                                            <div class="mb-1 space-y-2 w-full text-xs">
                                                <input bind:value="{extras}" placeholder="PKR" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Discount: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <input bind:value="{discount}" placeholder="PKR" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row pt-2 border-t border-gray-400 md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Total: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">{total} PKR</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                </div>
                                
                                <p class="text-xs text-red-500 dark:text-red-300 text-right my-3">{ errorMessage }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button on:click="{clearDeal}" id="cancel-btn" class="mb-2 md:mb-0 bg-transparent px-5 py-2 text-sm shadow-sm font-medium tracking-wider border dark:border-input-border text-gray-600 dark:text-list-item rounded-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"> Cancel </button>
                                    <button on:click="{submitHandler}" id="submit-btn" class="disabled:bg-gray-300 dark:disabled:bg-dark-border-gray mb-2 md:mb-0 bg-indigo-500 dark:bg-dark-indigo px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-800">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
{/if}

<style>
    input, textarea {
        outline: none;
    }
    input:focus, textarea:focus {
        border: solid 1px rgb(95, 183, 255);
    }
    form > input {
        margin: 0.6rem 0;
    }

    .modal-body {
        max-height: 650px;
        overflow: scroll;
    }

    @media only screen and (max-width: 770px) {
        .modal-body {
            height: 550px;
            overflow: scroll;
        }
    }
</style>