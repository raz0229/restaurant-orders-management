<script>
    export let showProfileModal;
    export let title = '', phone = '', address = '', notes = '';
    let profileErrorMessage = 'Short Note is optional';

    import { fade } from "svelte/transition"
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export const handleModal = () => {
        
        if (title.trim() == 0 || phone.trim() == 0 || address.trim() == 0 ) profileErrorMessage = 'Required fields cannot be blank'
        
        else {
            dispatch('info', {
                title,
                phone,
                address,
                notes
            })
        }
    }

</script>

{#if showProfileModal}
<!-- error modal -->
<div in:fade class="absolute z-40 h-screen w-full flex flex-col items-center justify-center font-sans" style="background: rgb(31 31 32 / 60%);">
	<div class="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
            <div class="mb-8 font-semibold">
                <h1><span class="material-icons" style="vertical-align: bottom;">
                    notes &nbsp;
                    </span>Tell us about yourself</h1>
            </div>
            <div class="mb-4 relative">
                <input bind:value="{title}" class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="title" type="text" autofocus>
                <label for="title" class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Full Name</label>
            </div>
            <div class="mb-4 relative">
                <input bind:value="{phone}" class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="title" type="text" autofocus>
                <label for="title" class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Phone Number</label>
            </div>
            <div class="mb-4 relative">
                <input bind:value="{address}" class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="title" type="text" autofocus>
                <label for="title" class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Address</label>
            </div>
            <div class="mb-4 relative">
                <input bind:value="{notes}" class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" id="title" type="text" autofocus>
                <label for="title" class="label absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text">Short Note</label>
            </div>

            <div class="mb-4 text-sm text-red-500" style="text-align: end;">
                { profileErrorMessage }
            </div>

            <div class="flex justify-center">
                <button on:click="{handleModal}"
                class="flex-no-shrink w-full text-white py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-800">
                Submit</button>
            </div>
        </div>
    </div>
</div>
{/if}

<style>
    .input {
        transition: border 0.2s ease-in-out;
        /* min-width: 280px */
    }

    .input:focus+.label,
    .input:active+.label {
        font-size: .75rem;
        transition: all 0.2s ease-out;
        top: -0.1rem;
        color: #667eea;
    }

    .label {
        transition: all 0.2s ease-out;
        top: 0.4rem;
        pointer-events: none;
      	left: 0;
    }
</style>
