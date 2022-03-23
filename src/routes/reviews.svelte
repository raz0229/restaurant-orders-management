<script context="module">
    export async function load({ fetch }) {
      const res = await fetch('/api/reviews')
      const { reviews } = await res.json()
      
      if (res.ok) {
        return {
          props: {
            reviews
          }
        }
      }
  
      return {
        status: res.status,
        error: new Error('Could not fetch the reviews')
      }
    }
  </script>
  
  <script>
      import Testimonials from "$lib/testimonials.svelte"
      import Cart from "$lib/cart.svelte"
      import { cart } from '$lib/stores'
      import { fade } from "svelte/transition"
      
      export let reviews;
  
    let hideCart, showModal;
    let starCount = 4, charCount = 0, errorMessage = '';
    let fullname = '', email = '', textBox = '';

    cart.subscribe(val => {
      hideCart = val;
    });
  
    const starSet = (length) => {
        const starDiv = document.querySelector('#star-set');
        for (let i = 0; i < starDiv.children.length; i++) {
            starDiv.children[i].classList.remove('text-yellow-400')

            for (let j = 0; j < length; j++) {
                starDiv.children[j].classList.add('text-yellow-400')
                starCount = length;
            }
        }
    }

    const updateCharCount = () => {
        charCount = textBox.length;
        
        if (charCount > 200) disableSubmitBtn('Only 200 characters or less allowed')
        else checkValidity()
    }

    const checkValidity = () => {
        if ((fullname.trim().length >= 3) && (/\S+@\S+\.\S+/.test(email))) enableSubmitBtn()
        else disableSubmitBtn('Please enter valid credentials')
    }

    const disableSubmitBtn = (msg) => {
        document.querySelector('#submit-btn').disabled = true;
        errorMessage = msg;
    }

    const enableSubmitBtn = () => {
        document.querySelector('#submit-btn').disabled = false;
        errorMessage = '';
    }


  </script>
  <Cart
      bind:hideCart
  />
  
  <Testimonials
      bind:reviews
      bind:showModal
  />
  
{#if showModal}
    <!-- Write a Review Modal -->
<div  in:fade out:fade id="abs" class="absolute min-h-screen flex items-center w-full justify-center bg-gray-200/50 py-12 px-4 sm:px-6 lg:px-8 relative items-center">
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div class="mt-12 max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
    <div class="grid  gap-8 grid-cols-1">
    <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-semibold text-lg mr-auto">Write a review</h2>
                <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div class="mt-5">
                <div class="form">
                    
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Your Name</label>
                                <input placeholder="Full Name" type="text" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" bind:value={fullname} required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 py-2">Your  Email</label>
                                <input placeholder="Valid Email ID" type="email" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" bind:value={email} required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                        </div>
                        
                            <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                <div class="w-full flex flex-col mb-3">
                                    <label class="font-semibold text-gray-600 py-2">Select Stars</label>
                                    <div class="text-gray-300" id="star-set">
                                        <span on:mouseenter="{()=>starSet(1)}" class="text-yellow-400 material-icons">star</span>
                                        <span on:mouseenter="{()=>starSet(2)}" class="text-yellow-400 material-icons">star</span>
                                        <span on:mouseenter="{()=>starSet(3)}" class="text-yellow-400 material-icons">star</span>
                                        <span on:mouseenter="{()=>starSet(4)}" class="text-yellow-400 material-icons">star</span>
                                        <span on:mouseenter="{()=>starSet(5)}" class="material-icons">star</span>
                                    </div>
                                </div>
                                    
                                </div>
                                <div class="flex-auto w-full mb-1 text-xs space-y-2">
                                    <label class="font-semibold text-gray-600 py-2">Comment</label>
                                    <textarea on:keyup="{updateCharCount}" bind:value="{textBox}" id="text-box" required="required" name="message" class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4" placeholder="Write a brief review of less than 200 characters" spellcheck="false"></textarea>
                                    <p class="text-xs text-gray-400 text-left my-3">You inserted { charCount } characters</p>
                                </div>
                                <p class="text-xs text-red-500 text-right my-3">{ errorMessage }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button on:click="{()=>showModal=false}" id="cancel-btn" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel </button>
                                    <button on:click="{checkValidity}" id="submit-btn" class="disabled:bg-gray-300 mb-2 md:mb-0 bg-indigo-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

{/if}

<style>
    #abs {
        position: absolute;
        top: 0;
    }
    #star-set {
        cursor: pointer;
    }
    #submit-btn {
        transition: all 0.3s ease;
    }
</style>