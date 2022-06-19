<script>
    export let showEditModal = false;

    import { fade } from "svelte/transition"
    import Canva from "$lib/deals";
    import { db } from "$lib/config/app";
    import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; 

    export let deal_name = '', priority = 0, deal_id, total, temp_total;
    export let productList = [];
    let extras = 0, discount = 0, errorMessage = '', item_name, item_price, item_qnt, item_type;

    const currency = import.meta.env.VITE_CURRENCY;

    const properties = Canva.getProperties()

    $: total = (() => {
        let pp = 0;
    
        if (productList.length != 0) {
            productList.forEach(e => {
                pp += e.price;
            })
    }
    
    if (!pp) pp = temp_total;

    const calc = (pp + (extras ? extras : 0)) - discount;
    return calc > 0 ? calc : 0; 
    })();

    const updatePreview = () => {
        const canvas = document.querySelector('#preview')

        let imageURL = ["deal-template.jpg","hotwings.png", "pizza.png", "drink.png", "nuggets.png", "zinger.png", "fries.png", "mpizza.png", "spizza.png", "sdrink.png","pasta.png", "dessert.png"]; // list of image URLs
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

    const postData = async () => {
     // Add a new document with a generated id.
        await addDoc(collection(db, "deals"), {
            id: priority || 0,
            title: capitalize(deal_name.trim().toLowerCase()),
            price: total,
            discount: Math.round((discount/total) * 100) || 0,
            deal: getCurrentDeal(),
            content: getCurrentContent()

        });

    }

    const updataData = async () => {
        const ref = doc(db, "deals", deal_id);

        await updateDoc(ref, {
            title: capitalize(deal_name.trim().toLowerCase()),
            price: total,
            id: priority || 0,
            discount: Math.round((discount/temp_total) * 100) || 0
        });
    }

    const getCurrentDeal = () => {
        let deal = productList.reduce(
            (obj, item) => Object.assign(obj, { [item.type]: item.qnt > 0 ? item.qnt : 1 }), {});
        return deal;
    }

    const getCurrentContent = () => {
        let arr = [];
        productList.forEach(product => arr.push(`${ capitalize(product.title.trim().toLowerCase()) } ${ parseInt(product.qnt ) > 1 ? `(${product.qnt})` : "" }`));
        return arr;
    }

    const submitHandler = async () => {
        // wish I knew Typescript
        if (!deal_name.trim().length == 0 && !productList.length == 0 && !(discount < 0 || extras < 0) && !total <= 0) {
            document.querySelector('#loop').classList.remove('hidden');
            errorMessage = '';
            try {
                if (productList[0].qnt) await postData();
                else await updataData();
                location.href = '/admin/dashboard/deals';
            } catch(e) {
                document.querySelector('#loop').classList.add('hidden');
                errorMessage = 'Something went wrong while applying changes'                 
            }
            
        } else if (productList.length == 0) {
            errorMessage = 'Please add at least 1 Product'
        } else if (total <= 0 || discount < 0 || extras < 0) {
            errorMessage = 'Price cannot be negative'
        } else {
            errorMessage = 'Please fill the required info'
        }
    }

    const clearDeal = () => {
        errorMessage = '';
        deal_name = '';
        showEditModal = false;
        extras = 0;
        discount = 0;
        total = 0;
        productList = [];
    }

</script>

{#if showEditModal}

<div  in:fade out:fade class="fixed top-0 z-30 min-h-screen flex items-center w-full justify-center bg-gray-200/50 dark:bg-semi-gray py-12 px-4 sm:px-6 lg:px-8 items-center">
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
                            <canvas id="preview" class="hidden" width="400" height="250"></canvas>
                            <img class="canva rounded border border-gray-200 object-center object-cover h-auto w-full" id="canvaspreview" src="../../fallback.png" alt="PREVIEW HERE">
                        </div>
                    </div>

                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Deal's Name</label>
                                <input placeholder="Name of deal" type="text" bind:value="{deal_name}" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Priority</label>
                                <input placeholder="0 is max" type="number" bind:value="{priority}" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                
                            </div>
                        </div>
                        
                            <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                <div class="relative flex-auto w-full mb-1 text-xs space-y-2">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Add Product</label>
                                    <form on:submit|preventDefault="{productManager}">
                                        <input
                                        id="text-box" bind:value="{item_name}" required="required" name="item" 
                                        class="w-full appearance-none block bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg p-3" placeholder="Item's Name">
                                        <div class="md:flex flex-row mt-2 md:space-x-4 w-full text-xs">
                                            <input bind:value="{item_price}"
                                                required="required" name="price" type="number" min="0"
                                                class="w-full appearance-none block mb-2 bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg  py-2 px-2" placeholder="Price">
                                            <input bind:value="{item_qnt}"
                                                name="qnt" type="number"
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
                                                {#if product.title}
                                                    <p>{capitalize(product.title)} {product.qnt ? `(${product.qnt})` : ''}</p>
                                                {:else}
                                                    <p>{ capitalize(product) }</p>
                                                {/if}    
                                            </div>
                                            {#if product.price}
                                            <div class="flex-1 mb-1 space-y-2 w-full text-xs">
                                                <p>{product.price}</p>
                                            </div>
                                            {/if}
                                        </div>
                                        {/each}

                                        <div class="md:flex flex-row mt-2 md:space-x-4 w-full text-xs">
                                            <div class="mb-1 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Extras: </label>
                                            </div>
                                            <div class="mb-1 space-y-2 w-full text-xs">
                                                <input bind:value="{extras}" placeholder="{currency}" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Discount: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <input bind:value="{discount}" placeholder="{currency}" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row pt-2 border-t border-gray-400 md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Total: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">{total} {currency}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                </div>
                                
                                <p class="text-xs text-red-500 dark:text-red-300 text-right my-3">{ errorMessage }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button on:click="{clearDeal}" id="cancel-btn" class="mb-2 md:mb-0 bg-transparent px-5 py-2 text-sm shadow-sm font-medium tracking-wider border dark:border-input-border text-gray-600 dark:text-list-item rounded-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"> Cancel </button>
                                    <button on:click="{submitHandler}" id="submit-btn" class="disabled:bg-gray-300 dark:disabled:bg-dark-border-gray mb-2 md:mb-0 bg-indigo-500 dark:bg-dark-indigo px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-800">
                                        <span id="loop" class="hidden animate-spin material-icons" style="vertical-align: bottom;">loop</span>&nbsp;Submit</button>
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