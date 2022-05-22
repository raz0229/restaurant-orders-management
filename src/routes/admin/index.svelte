<script context="module">
  import { isSignedIn } from "$lib/config/controllers"
  import { page_title } from "$lib/stores";

  page_title.update(title => 'Admin')

  const checkState = async () => {
    const signedIn = await isSignedIn()
    if (signedIn) location.href = '/admin/dashboard'
  }

  checkState();
</script>

<script>
  import { auth } from "$lib/config/app"
  import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth"
  import Cart from "$lib/cart.svelte"
  import { cart } from '$lib/stores';
  
  let hideCart;

  cart.subscribe(val => {
    hideCart = val;
  });

  let email, password, remember = false, errorMessage = '';

  const login = async () => {

    let loop = document.querySelector('#loop')
    loop.classList.remove('hidden')

    try {
      const uc = await signInWithEmailAndPassword(auth, email.trim(), password.trim())
      errorMessage = ''
      loop.classList.add('hidden')
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence)
      location.href = '/admin/dashboard'
    } catch (e) {
      errorMessage = 'Incorrect email or password'
      email = '';
      password = '';
      loop.classList.add('hidden')
    }
  }

  const togglePswd = () => {
    let x = document.querySelector("#password");
    let y = document.querySelector('#visibility')
    
    if (x.type === "password") {
      x.type = "text"
      y.style.color = "#4446d5"
    }
    else {
      x.type = "password"
      y.style.color = "#9ca3af"
    }
  }


</script>

<Cart 
  bind:hideCart />

<div class="w-full min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col justify-center items-center lg:pt-6 md:pt-8">
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold dark:text-light-header">Welcome.</h2>
      <form>
        <div class="mb-4">
          <label class="block mb-1 dark:text-dark-p" for="email">Email Address</label>
          <input bind:value="{email}" id="email" type="text" name="email" class="py-2 px-3 dark:bg-dark-bg dark:text-dark-p border border-gray-300 dark:border-dark-border-gray focus:border-indigo-300 focus:dark:border-indigo-800 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="relative mb-4">
          <label class="block mb-1 dark:text-dark-p" for="password">Password</label>
          <input bind:value="{password}" id="password" type="password" name="password" class="py-2 px-3 dark:bg-dark-bg dark:text-dark-p border border-gray-300 dark:border-dark-border-gray focus:border-indigo-300 focus:dark:border-indigo-800 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          <span on:click="{togglePswd}" id="visibility" style="transition: color 0.3s ease" class="absolute right-3 bottom-2 material-icons text-gray-400 hover:text-gray-600 cursor-pointer">
            visibility
            </span>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember_me" bind:checked="{remember}" type="checkbox" class="border border-gray-300 dark:border-dark-border-gray text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900 dark:text-light-indigo"> Remember me </label>
          </div>
          <a href="#" class="text-sm dark:text-dark-p"> Forgot your password? </a>
        </div>
        <p class="text-md text-red-500 text-right my-3">{ errorMessage }</p>
        <div class="mt-6">
          <button on:click|preventDefault="{login}" 
            class="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 dark:bg-dark-indigo-button dark:hover:bg-indigo-800 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 disabled:opacity-25 transition">
            <span id="loop" class="hidden animate-spin material-icons">loop</span>
              &nbsp; Sign In
          </button>
        </div>
      </form>
    </div>
  </div>