<script>
    export let showEditModal = false;

    import { fade } from "svelte/transition"

    let deal_name, item_name, item_price, item_qnt;
    let productList = [];

    const productManager = () => {
        if (!productList.find(item=>item.title == item_name.trim().toLowerCase())) {
            productList.push({
                title: item_name.trim().toLowerCase(),
                price: item_price,
                qnt: item_qnt
            })
            item_name = ''; item_price = ''; item_qnt = '';
        }
        console.log(productList)
    }
</script>

{#if showEditModal}
<div  in:fade out:fade class="fixed top-0 z-20 min-h-screen flex items-center w-full justify-center bg-gray-200/50 dark:bg-semi-gray py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute bg-black opacity-60 inset-0 z-30"></div>
    <div class="modal-body mt-12 max-w-md w-full space-y-8 p-10 bg-white dark:bg-dark-bg rounded-xl shadow-lg z-40">
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
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Deal's Name</label>
                                <input placeholder="Name of deal" type="text" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                
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
                                                <select name="type" id="type" class="p-2 bg-gray-100">
                                                    <option value="sm">Small Pizza</option>
                                                    <option value="md">Medium Pizza</option>
                                                    <option value="lg">Large Pizza</option>
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
                                        <p>500</p>
                                        <p>1200</p>
                                        <p>50</p>
                                        <p>500</p>
                                        <p>1200</p>
                                        <p>50</p>
                                        <p>100</p>
                                        <div class="md:flex flex-row mt-2 md:space-x-4 w-full text-xs">
                                            <div class="mb-1 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Extras: </label>
                                            </div>
                                            <div class="mb-1 space-y-2 w-full text-xs">
                                                <input placeholder="PKR" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Discount: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <input placeholder="PKR" type="number" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-md h-6 px-2">
                                            </div>
                                        </div>
                                        <div class="md:flex flex-row pt-2 border-t border-gray-400 md:space-x-4 w-full text-xs">
                                            <div class="mb-3 space-y-2 w-full text-xs" style="text-align: start;">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Total: </label>
                                            </div>
                                            <div class="mb-3 space-y-2 w-full text-xs">
                                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">3300 PKR</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                </div>
                                
                                <p class="text-xs text-red-500 dark:text-red-300 text-right my-3">{ 1+2 }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button on:click="{()=>showEditModal=false}" id="cancel-btn" class="mb-2 md:mb-0 bg-transparent px-5 py-2 text-sm shadow-sm font-medium tracking-wider border dark:border-input-border text-gray-600 dark:text-list-item rounded-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"> Cancel </button>
                                    <button id="submit-btn" disabled class="disabled:bg-gray-300 dark:disabled:bg-dark-border-gray mb-2 md:mb-0 bg-indigo-500 dark:bg-dark-indigo px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-800">Submit</button>
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

    @media only screen and (max-width: 770px) {
        .modal-body {
            height: 550px;
            overflow: scroll;
        }
    }
</style>