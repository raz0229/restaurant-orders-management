<script context="module">
  import { page_title } from "$lib/stores";
  page_title.update(title => 'About Us') 
</script>


<script>
  import Cart from "$lib/cart.svelte"
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
<div class="mt-16 py-16 bg-white dark:bg-gray-900">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
          <img class="rounded drop-shadow-xl" src="/startup.png" alt="image" loading="lazy" width="" height="">
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 dark:text-light-header font-bold md:text-4xl">Give your taste buds a sumptuous delight to taste</h2>
          <p class="mt-6 text-gray-600 dark:text-dark-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
          <p class="mt-4 text-gray-600 dark:text-dark-p"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
        </div>
      </div>
  </div>
</div>

<!-- component -->
<section class="bg-white dark:bg-gray-900">
  <div class="container px-6 py-10 mx-auto">
      <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">explore our <br> awesome <span class="underline decoration-blue-500">variety</span></h1>
      
      <p class="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
      </p>
      
      <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <span class="inline-block text-blue-500 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
              </span>

              <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Best in town</h1>

              <p class="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
              </p>

          </div>

          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <span class="inline-block text-blue-500 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
              </span>

              <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Affordable Deals</h1>

              <p class="text-gray-500 dark:text-gray-300">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
              </p>

          </div>

          <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
            <span class="inline-block text-blue-500 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            </span>

            <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Super fast delivery</h1>

            <p class="text-gray-500 dark:text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
            </p>

        </div>

        <div class="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          <span class="inline-block text-blue-500 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z" />
              </svg>
          </span>

          <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Organize special events</h1>

          <p class="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
          </p>

      </div>

      </div>
  </div>
</section>



<!-- About the developer -->

<!-- ====== Cards Section Start -->
<section class="p-4 pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6] dark:bg-gray-900">
   <div class="container ">
      <div class="flex flex-wrap -mx-4">
         <div class="w-full md:w-1/2 m-12 md:m-0 xl:w-1/3 px-4" style="align-self: center; text-align: center;">
          <h1 class="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-dark-blue">About the Developer</h1>
         </div>
         
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white text-center rounded-lg overflow-hidden mb-10" style="text-align: -webkit-center; text-align: -moz-center;">
               <img
                  src="RAZ0229.gif"
                  alt="image"
                  class="w-1/2 p-2"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <a
                        href="https://raz0229.github.io"
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     @raz0229
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Full-stack developer and Ethical hacker.
                  </p>
                  <a
                     href="https://buymeacoffee.com/raz0229"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#E5E7EB]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-indigo-700 hover:text-white
                     transition
                     "
                     >
                     <span class="material-icons" style="vertical-align: bottom;">
                      coffee
                      </span>
                      &nbsp;
                     Buy me a coffee
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<!-- ====== Cards Section End -->


<style>

</style>