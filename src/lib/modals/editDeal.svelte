<script>
    export let showEditModal = false;

    import { fade } from "svelte/transition"
</script>

{#if showEditModal}
<div  in:fade out:fade class="fixed top-0 z-40 min-h-screen flex items-center w-full justify-center bg-gray-200/50 dark:bg-semi-gray py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div class="mt-12 max-w-md w-full space-y-8 p-10 bg-white dark:bg-dark-bg rounded-xl shadow-lg z-10">
    <div class="grid  gap-8 grid-cols-1">
    <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-semibold dark:text-dark-p dark:placeholder:text-input-border text-lg mr-auto">Write a review</h2>
                <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div class="mt-5">
                <div class="form">
                    
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Your Name</label>
                                <input placeholder="Full Name" type="text" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Your  Email</label>
                                <input placeholder="Valid Email ID" type="email" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                        </div>
                        
                            <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                <div class="w-full flex flex-col mb-3">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Select Stars</label>
                                    <div class="text-gray-300" >
                                        <p>Something</p>
                                        <p>Something</p>
                                        <p>Something</p>
                                    </div>
                                </div>
                                    
                                </div>
                                <div class="flex-auto w-full mb-1 text-xs space-y-2">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Comment</label>
                                    <textarea id="text-box" required="required" name="message" class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg  py-4 px-4" placeholder="Write a brief review of less than 200 characters" spellcheck="false"></textarea>
                                    <p class="text-xs text-gray-400 dark:text-char-count text-left my-3">You inserted 0 characters</p>
                                </div>
                                <p class="text-xs text-red-500 dark:text-red-300 text-right my-3">{ 1+2 }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button id="cancel-btn" class="mb-2 md:mb-0 bg-transparent px-5 py-2 text-sm shadow-sm font-medium tracking-wider border dark:border-input-border text-gray-600 dark:text-list-item rounded-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"> Cancel </button>
                                    <button id="submit-btn" disabled class="disabled:bg-gray-300 dark:disabled:bg-dark-border-gray mb-2 md:mb-0 bg-indigo-500 dark:bg-dark-indigo px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-800">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
{/if}