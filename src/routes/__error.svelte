<script context="module">
    import { page_title } from "$lib/stores";
	page_title.update(title => 'Oops!') 
	
	export function load({ error }) {
		return {
			props: {
				message: error.message
			}
		};
	}
</script>

<script>
	export let message;
	import Cart from "$lib/cart.svelte";
	import { cart } from '$lib/stores';

	let hideCart;
  	cart.subscribe(val => {
		hideCart = val;
  	});

</script>


<Cart 
  bind:hideCart
  />

<!-- component -->
<div class="mt-20 error lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
	<div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
		<div class="relative">
			<div class="absolute z-20">
				<div class="">
					<h1 class="my-2 text-gray-800 font-bold text-2xl dark:text-light-header">
						I think we might have a bit of a problem
					</h1>
					<p class="my-2 text-gray-800 dark:text-light-p">Here's what our detectives have to say about this:
						<span class="text-sm text-gray-800 dark:text-light-header"><em>{ message }</em></span>
					</p>
					
					<button on:click="{()=>location.href="/"}" 
						class="sm:w-full lg:w-auto my-2 rounded md py-4 px-8 text-center bg-indigo-600 dark:bg-dark-indigo-button text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Take me Home!</button>
				</div>
			</div>
			<div>
				<img class="dark:invert-[10%] dark:opacity-25" src="/404.png" alt="404"/>
			</div>
		</div>
	</div>
	<div>
		<img class="dark:opacity-75 dark:invert-[10%]" src="/illustration.png" alt="OOPS"/>
	</div>
</div>

<style>
  .error {
    text-align: center;
    margin-bottom: 60px;
  }
</style>