<script>
	import { auth } from '$lib/config/app';
	import { signOut } from 'firebase/auth';
	import '../../../styles/global.css'
	import { isSignedIn } from "$lib/config/controllers"
	import { fade } from 'svelte/transition';
	import { browser } from "$app/env"

	let user;
  
	const checkState = async () => {
	  const signedIn = await isSignedIn()
	  if (!signedIn) location.href = '/admin'
	  else user = signedIn
	}

	const logout = () => {
		signOut(auth).then(() => {
  			location.href = '/admin'
		})
	}

	if (browser) checkState()
</script>

  <div class="container">
	  <div id="side-bar">
		  <aside
		  class="flex flex-col fixed items-center bg-white text-gray-700 shadow h-full">
		  <!-- Side Nav Bar-->
  
		  <div class="h-16 flex items-center w-full">
			  <!-- Logo Section -->
			  <a class="h-6 w-6 mx-auto" href="http://svelte.dev/">
				  <img
					  class="h-6 w-6 mx-auto"
					  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
					  alt="svelte logo" />
			  </a>
		  </div>
  
		  <ul class="un-list w-full">
			  <!-- Items Section -->
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <polyline
							  points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
						  <path
							  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
							  2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
							  0-1.79 1.11z"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Dashboard
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <path
							  d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Something
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
  
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <polyline points="3 6 5 6 21 6"></polyline>
						  <path
							  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2
							  0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Something
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <circle cx="9" cy="21" r="1"></circle>
						  <circle cx="20" cy="21" r="1"></circle>
						  <path
							  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0
							  2-1.61L23 6H6"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Something
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <circle cx="12" cy="12" r="3"></circle>
						  <path
							  d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							  0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							  0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							  2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							  0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							  0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							  0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							  0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							  1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							  1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							  0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							  1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							  2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							  0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							  1.65 0 0 0-1.51 1z"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Something
					  </span>
				  </a>
			  </li>
  
			  <li class="hover:bg-gray-100">
				  <a
					  href="."
					  class="h-16 px-6 flex flex justify-center items-center w-full
					  focus:text-orange-500">
					  <svg
						  class="h-5 w-5"
						  xmlns="http://www.w3.org/2000/svg"
						  width="24"
						  height="24"
						  viewBox="0 0 24 24"
						  fill="none"
						  stroke="currentColor"
						  stroke-width="2"
						  stroke-linecap="round"
						  stroke-linejoin="round">
						  <path
							  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
						  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
					  </svg>
					  <span class="sc-list text-lg pl-2">
						  Something
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
		<main>
	  		<slot></slot>
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

  @media only screen and (max-width: 920px) {
	  .container {
			grid-template-columns: 0fr 1fr 1fr 1fr 1fr 1fr;
	  }
	  .sc-list {
		  display: none;
	  }
  }

  </style>