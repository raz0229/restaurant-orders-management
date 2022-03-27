<script>
    export let showErrorModal = false;
    export let errorMessage = 'Error Message Here';
    export let errorFix = 'Here\'s how to fix it!';

    import { fade } from "svelte/transition"
</script>

<!-- error modal -->
<div in:fade class="absolute z-40 h-screen w-full flex flex-col items-center justify-center font-sans" style="background: rgb(31 31 32 / 60%);">
	<div class="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
            <div class="mb-4 font-semibold">
                <h1>{errorMessage}</h1>
            </div>
            <div class="mb-8">
                <p>{errorFix}</p>
            </div>
            <div class="flex justify-center">
                <button on:click="{()=>showErrorModal=false}"
                class="flex-no-shrink text-white py-2 px-4 rounded bg-red-600 hover:bg-red-800">Close</button>
            </div>
        </div>
    </div>
</div>
