<script context="module">
    import { page_title } from "$lib/stores";
    page_title.update(title => 'Privacy Policy') 
</script>

<script>
    import { cart } from '$lib/stores';
    import Cart from "$lib/cart.svelte"

    let hideCart;
    cart.subscribe(val => {
        hideCart = val;
    });

</script>


<Cart 
  bind:hideCart
  />
<!-- Privacy Policy -->
<div class="mt-16 lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center text-center">
	<h1 class="text-6xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-dark-blue">Privacy Policy</h1>
    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe?</p>


    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam sequi voluptatem quod aperiam pariatur incidunt cum, magnam sed quos possimus minima aut nihil sint cupiditate in excepturi ducimus similique repellendus.</p>

    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe?</p>

</div>

<!-- Terms and Cnditions -->
<div class="mt-4 mb-12 lg:px-12 lg:py-12 md:py-8 md:px-12 px-2 py-12 items-center text-center">
	<h1 class="text-6xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-dark-blue">Terms and Conditions</h1>
    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe?</p>


    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam sequi voluptatem quod aperiam pariatur incidunt cum, magnam sed quos possimus minima aut nihil sint cupiditate in excepturi ducimus similique repellendus.</p>

    <p class="mt-4 text-xl text-gray-500 dark:text-dark-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto repellat sit neque accusamus consequatur quam, ea cum dolores, in fugiat commodi dignissimos? Nam deserunt pariatur quae similique ipsa sed saepe?</p>

</div>

<style>
</style>