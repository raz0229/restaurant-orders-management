<script context="module">

    import { getSettings, getUTCHours, getTotal } from "$lib/config/controllers";

    export async function load({ fetch }) {
      
        try {
            const delivery = await getSettings('delivery-charges');
            const max_deals = await getSettings('max-deals');
            const max_reviews = await getSettings('max-reviews');
            const working_hours = await getUTCHours()
            const total_deals = await getTotal('deals')
            const total_reviews = await getTotal('reviews')

            return {
                props: {
                    delivery,
                    max_deals,
                    max_reviews,
                    opening_hour: working_hours[0],
                    closing_hour: working_hours[1],
                    total_deals,
                    total_reviews
                }
            }
        } catch (e) {

            return {
                status: 401,
                error: new Error('Something went wrong')
            }
        }

    }
</script>

<script>

    import { setSettings, setUTCHours } from "$lib/config/controllers";
    import { fade } from "svelte/transition";
    export let delivery, max_deals, max_reviews, opening_hour, closing_hour, total_deals, total_reviews;

    let errorMessage = '', disabled = true, clickedSubmit = false;
    let d = new Date(); 
    let utc = d.getHours() - d.getUTCHours();
    

    const submitHandler = async () => {
        errorMessage = '';
        clickedSubmit = true;

        const open = document.querySelector('#opening-hour').value
        const close = document.querySelector('#closing-hour').value

        // Secondary Error checks
        if (total_deals == -1 || total_reviews == -1) errorMessage = "Please connect to the internet"
        else if (max_reviews < 3 || max_reviews > total_reviews) errorMessage = 'Max Reviews couldn\'t be set'
        else if (max_deals < 3 || max_deals > total_deals) errorMessage = 'Max Deals couldn\'t be set'
        else if (!(parseInt(open) >= 0 && parseInt(open) <= 11)) errorMessage = "Select valid opening hours"
        else if (!(parseInt(close) >= 12 && parseInt(close) <= 23)) errorMessage = "Select valid closing hours"
        else if (parseInt(delivery) < 0) errorMessage = "Delivery charges cannot be less than 0"
        else {
            try {
                await setSettings('delivery-charges', delivery);
                await setSettings('max-reviews', max_reviews);
                await setSettings('max-deals', max_deals);
                await setUTCHours((parseInt(open) - utc), (parseInt(close) - utc));
                clickedSubmit = false;
            } catch(e) {
                errorMessage = "Something went wrong! Couldn't make changes";
            }
        }
        clickedSubmit = false;
    }

    const enableButton = async () => {
        disabled = false;
    }

</script>

<svelte:head>
  <title> Settings | Admin</title>
</svelte:head>

{#if clickedSubmit}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
    <div class="absolute m-4 text-gray-100" style="text-align: -webkit-center; text-align: -moz-center;">
      <img class="w-2/4" src="/buffer.svg" alt="">
    </div>
  </div>
{/if}

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="page-title-settings text-4xl font-semibold text-black">Settings</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
            This page contains a few options you can change to make the front-end of your website to look the way prefer. Make sure to Save the settings before logging out
        </p>
  
        </div>

        <div class="w-full mt-4 px-4 py-4">
            <form on:submit|preventDefault="{submitHandler}">
            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Max Deals
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Represents number of deals to show on your website's home page. Number can only be between 3 and the total number of deals.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input on:change="{enableButton}" 
                        class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="3" bind:value="{ max_deals }" max="{ total_deals }" required>
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Max Reviews
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Represents number of reviews to show on your website's home page. Number can only be between 3 and the total number of reviews.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input on:change="{enableButton}" 
                        class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="3" bind:value="{ max_reviews }" max="{ total_reviews }" required>
                </div>
            </div>



            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Opening Hour
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Specify the local hour (24-hour format) when your restaurant opens.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <select on:change="{enableButton}" 
                        id="opening-hour" value="{ `${opening_hour + utc}` }" required
                     class="w-100 border border-gray-300 bg-gray-100 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500">
                        <option value="1">1 AM</option>
                        <option value="2">2 AM</option>
                        <option value="3">3 AM</option>
                        <option value="4">4 AM</option>
                        <option value="5">5 AM</option>
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="0">12 PM</option>
                    </select>
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Closing Hour
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        Specify the local hour (24-hour format) when your restaurant closes. Customers will only be able to order between these hours.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <select on:change="{enableButton}" 
                        id="closing-hour" value="{ `${closing_hour + utc}` }" required class="w-100 border border-gray-300 bg-gray-100 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500">
                        <option value="12">1 PM</option>
                        <option value="13">2 PM</option>
                        <option value="14">3 PM</option>
                        <option value="15">4 PM</option>
                        <option value="16">5 PM</option>
                        <option value="17">6 PM</option>
                        <option value="18">7 PM</option>
                        <option value="19">8 PM</option>
                        <option value="20">9 PM</option>
                        <option value="21">10 PM</option>
                        <option value="22">11 PM</option>
                        <option value="23">12 AM</option>
                    </select>
                </div>
            </div>

            <div class="flex px-2 py-2 border-t border-gray-300">
                <div class="flex-3-4 p-2 text-left mt-4">
                    <div class="text-lg text-gray-700 font-semibold">
                        Delivery Charges
                    </div>
                    <div class="text-md text-gray-500 font-normal">
                        This amount will automatically be added to his/her bill whenever someone places an order.
                    </div>    
                </div>
                <div class="flex-1-4 p-3-0 text-md">
                    <input on:change="{enableButton}" 
                        class="w-100 border border-gray-300 rounded text-center p-2 outline outline-1 outline-offset-2 outline-cyan-500 focus:outline-blue-500" 
                        type="number" min="0" bind:value="{ delivery }" required>
                </div>
            </div>


            <div class="text-md text-red-500 text-right p-4 mr-4">
                { errorMessage }
            </div>

            <button type="submit" disabled="{disabled}" 
                class="w-80 mt-6 px-4 py-4 bg-indigo-600 disabled:bg-gray-300 hover:bg-indigo-800 rounded text-white font-lg">
                Save Changes
            </button>
            </form>
        </div>

    </div>
</div>

<style>
    .flex-3-4 {
        flex: 3 1 0;
    }
    .flex-1-4 {
        flex: 1 1 0;
    }
    .p-3-0 {
        padding: 3rem 0;
    }
    input, select {
        width: clamp(30px, 100%, 100%);
    }

.bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>