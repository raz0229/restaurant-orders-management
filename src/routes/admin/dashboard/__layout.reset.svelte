<script>
	import { auth } from '$lib/config/app';
	import { signOut } from 'firebase/auth';
	import '../../../styles/global.css'
	import { isSignedIn } from "$lib/config/controllers"
	import { setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { browser } from "$app/env";
	import { writable } from "svelte/store"

	let user, isMobile = true, showFooter = false;
	const ws = writable(user);

	const checkState = async () => {
	  const signedIn = await isSignedIn()
	  if (!signedIn) location.href = '/admin'
	  else {
		  user = signedIn;
		  ws.update(x => user.user)
	  }
	// Switch to test mode if specific USER ID
	// Following UID corresponds to the given credentials provided for test-only pruposes. 
	// Access is restricted and handled through firebase security rules only.
	// See 'security-rules.txt' file to manage rules on your app
	  if (user?.user.uid == import.meta.env.VITE_DEMO_UID) showFooter = true;
	}

	const logout = () => {
		signOut(auth).then(() => {
  			location.href = '/admin'
		})
	}

	const removeDarkMode = () => {
		document.querySelector('html').classList.remove('dark');
	}

	const toggleSideMenu = () => {
		isMobile = !isMobile;
	}

	const closeFooter = () => {
		//node.target.parentNode.classList.add('hidden');
		showFooter = false;
	}

	if (browser) {
		removeDarkMode()
		checkState()
		// reactive context
		setContext('user-details', ws);
	}

</script>

<input id="hamburger" type="checkbox" bind:checked="{ isMobile }"
	class="fixed z-40 left-4 top-2 p-2 rounded-full border-indigo-600 hover:bg-indigo-200 text-center text-indigo-600">

  <div class="container">
	  <div id="side-bar">
		  <aside in:fade out:fade
		  class="flex flex-col fixed items-center bg-white text-gray-700 shadow h-full">
		  <!-- Side Nav Bar-->
  
		  <div on:click="{ toggleSideMenu }" 
		  	class="h-16 flex items-center w-full text-indigo-600" style="cursor: pointer;">
			  <!-- Logo Section -->
			  <span class="h-6 w-6 mx-auto text-indigo-600 material-icons">
				arrow_back
				</span>
		  </div>
  
		  <ul class="un-list w-full">
			  <!-- Items Section -->
			  <li class="hover:bg-gray-100">
				  <a
					  href="/admin/dashboard"
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg  class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z"/></svg>
					  <span class="sc-list text-lg pl-2">
						  Orders
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="/admin/dashboard/products"
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2l-5.5 9h11z"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M3 13.5h8v8H3z"/></svg>
					  <span class="sc-list text-lg pl-2">
						  Products
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="/admin/dashboard/deals"
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
  
					  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
					  <span class="sc-list text-lg pl-2">
						  Deals
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="/admin/dashboard/reviews"
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><g><path d="M0,0h24v24H0V0z" fill="none"/></g></g><g><path d="M12,8.89L12.94,12h2.82l-2.27,1.62l0.93,3.01L12,14.79l-2.42,1.84l0.93-3.01L8.24,12h2.82L12,8.89 M12,2l-2.42,8H2 l6.17,4.41L5.83,22L12,17.31L18.18,22l-2.35-7.59L22,10h-7.58L12,2L12,2z"/></g></svg>
					  <span class="sc-list text-lg pl-2">
						  Reviews
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				<a
					href="/admin/dashboard/account"
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
					<span class="sc-list text-lg pl-2">
						Account
					</span>
				</a>
			</li>

			  <li class="hover:bg-gray-100">
				  <a
					  href="/admin/dashboard/settings"
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>
					  <span class="sc-list text-lg pl-2">
						  Settings
					  </span>
				  </a>
			  </li>
  
		  </ul>
  
		  <div  on:click="{ logout }" class="mt-auto h-16 flex items-center w-full">
			  <!-- Action Section -->
			  <button
				  class="h-16 w-full mx-auto flex flex justify-center items-center
				  w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
				  <svg
					  class="h-5 w-5 text-red-700"
					  xmlns="http://www.w3.org/2000/svg"
					  width="24"
					  height="24"
					  viewBox="0 0 24 24"
					  fill="none"
					  stroke="currentColor"
					  stroke-width="2"
					  stroke-linecap="round"
					  stroke-linejoin="round">
					  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
					  <polyline points="16 17 21 12 16 7"></polyline>
					  <line x1="21" y1="12" x2="9" y2="12"></line>
				  </svg>
				  <span class="sc-list text-lg pl-2">
					Logout
				</span>
			  </button>
		  </div>
  
	  </aside>
	  </div>
	  <div id="main-container">
		{#if user}
		<!-- {console.log(user.user.uid)} -->
		<main>
	  		<slot ></slot>

			<!-- TEST MODE -->
			{#if showFooter}
			<footer 
				in:fade out:fly="{{ y: 100, duration: 1000 }}" 
				style="font-stretch: condensed;" 
				class="w-full z-30 absolute bottom-0 left-0 p-2 bg-green-600 text-white text-center">
				<b class="text-yellow-400">Test Mode: </b>
				&nbsp;Changes made in Test Mode will not be published live.
				<span on:click={closeFooter}
				class="absolute right-4 cursor-pointer">×</span>
			</footer>
			{/if}

		</main>
		{:else}
		<div in:fade="{{duration: 300}}" class="spinner padding-3 w-screen z-50">
			<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
		</div>    
		{/if}

	  </div>
  </div>
  
  <style>
  .spinner {
	  position: absolute;
	  left: 45%;
	  top: 40%;
  }
  .container {
	 display: grid; 
	 transition: all 0.3s ease;

	 grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
	 grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	 
	 gap: 0px;
	 height: 100vh;
  
	 max-width: 100%;
	 
  }


  #hamburger {
	-webkit-appearance: none;
  	appearance: none;
  	background-image: url('../../hamburger.svg');
	width: 25px;
	  height: 30px;
  }

  #side-bar {
  
	 grid-row-start: 1;
	 grid-column-start: 1;
  
	 grid-row-end: 7;
	 grid-column-end: 2;
	 
  }
  #main-container {
  
	 grid-row-start: 1;
	 grid-column-start: 2;
  
	 grid-row-end: 7;
	 grid-column-end: 7;
	 
  }

  aside {
	  z-index: 99;
  }

  @media only screen and (max-width: 920px) {

	.container {
		grid-template-columns: 0fr 1fr 1fr 1fr 1fr 1fr;
	}
	 
	  #hamburger:checked + .container #side-bar {
		  display: none;
	  }
	  #hamburger:checked + .container #main-container {
		  grid-column-start: 1;
		  grid-column-end: 7;
	  }
  }

  </style>