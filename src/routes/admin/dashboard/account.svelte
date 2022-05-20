<script>
    import { getContext } from "svelte";
    import { auth } from "$lib/config/app";
    import { updateEmail, updatePassword } from "firebase/auth";
    import { fade } from "svelte/transition";
    
    const user = getContext('user-details');
    let userImpl, email, password = '', password_confirm = '', clickedSubmit = false;

    $: notPassed = (
        !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
        !(password == password_confirm && 
        password.length !== 0 && 
        password_confirm.length !== 0) ||
        !(password?.length >= 8 && 
        password_confirm?.length >= 8)
    )

    user.subscribe( cred => {
        userImpl = cred;
    })

    const updateCred = async () => {
        clickedSubmit = true;

        if (userImpl.uid !== import.meta.env.VITE_DEMO_UID && !notPassed) {
            try {
                await updateEmail(auth.currentUser, email.trim());
                await updatePassword(auth.currentUser, password);
                location.href = '/admin/dashboard/account';
            } catch (e) {
                console.log(e)
                clickedSubmit = false;
            }
        }
        else clickedSubmit = false;
    }
</script>

<svelte:head>
  <title> Account | Admin </title>
</svelte:head>


{#if clickedSubmit}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
    <div class="absolute m-4 text-gray-100" style="text-align: -webkit-center;">
      <img class="w-2/4" src="../../buffer.svg" alt="">
    </div>
  </div>
{/if}

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">

        <h2 class="text-4xl font-semibold text-black">Account</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
            You can simply change your account's email or password through the Account page. Make sure you use a strong password to save it from attackers.
        </p>
        </div>
    </div>

<div class="container max-w-full mx-auto md:py-24 px-6">
  <div class="max-w-sm mx-auto px-6">
        <div class="relative flex flex-wrap">
            <div class="w-full relative">
                <div class="md:mt-2">
                    <form on:submit|preventDefault="{updateCred}" 
                        class="mt-2">
                        <div class="mx-auto max-w-lg ">
                            <div class="py-1">
                                <span class="px-1 text-sm text-gray-600">New Email</span>
                                <input placeholder="{ userImpl?.email }" type="email" bind:value="{email}"
                                       class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-400 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none">
                            </div>
                            <div class="py-1">
                                <span class="px-1 text-sm text-gray-600">New Password</span>
                                <input placeholder="" type="password" bind:value="{password}"
                                       class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                            </div>
                            <div class="py-1">
                                <span class="px-1 text-sm text-gray-600">Confirm Password</span>
                                <input placeholder="" type="password" bind:value="{password_confirm}"
                                       class="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                            </div>
                            <div class="flex justify-start mt-3 ml-4 p-1">
                                <ul>
                                    <li class="flex items-center py-1 { /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "text-green-600" : "text-red-500" } ">
                                        <div 
                                        class=" rounded-full p-1 fill-current ">
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M5 13l4 4L19 7"/>
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>

                                            </svg>
                                        </div>
                                        <span 
                                            class="font-medium text-sm ml-3"
                                            >Enter a valid email</span>
                                    </li>
                                    <li class="flex items-center py-1 { (password == password_confirm && password.length !== 0 && password_confirm.length !== 0) ? "text-green-600" : "text-red-500" } ">
                                        <div 
                                        class=" rounded-full p-1 fill-current ">
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M5 13l4 4L19 7"/>
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>

                                            </svg>
                                        </div>
                                        <span 
                                            class="font-medium text-sm ml-3"
                                            >Passwords do not match</span>
                                    </li>
                                    <li class="flex items-center py-1 { (password?.length >= 8 && password_confirm?.length >= 8) ? "text-green-600" : "text-red-500" }">
                                        <div 
                                            class=" rounded-full p-1 fill-current ">
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M5 13l4 4L19 7"/>
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="2"
                                                      d="M6 18L18 6M6 6l12 12"/>

                                            </svg>
                                        </div>
                                        <span 
                                            class="font-medium text-sm ml-3"
                                            >At least 8 characters required</span>
                                    </li>
                                </ul>
                            </div>
                            <button disabled={notPassed} class="mt-3 text-lg font-semibold
            bg-indigo-700 disabled:bg-gray-400 w-full text-white rounded-lg
            px-6 py-3 block shadow-xl hover:text-white hover:bg-indigo-900">
                                Update
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>

</div>

<style>
    input {
        outline: none;
    }

.bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>