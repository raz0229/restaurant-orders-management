<script context="module">

    export async function load({ fetch }) {
      const res = await fetch(`/api/reviews`)
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
  
    let hideCart, showModal, updateRevs, tempLength = 0;
    let starCount = 4, charCount = 0, errorMessage = '', end = false, overwrite;
    let fullname = '', email = '', textBox = '', selection;

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

    const checkValidity = () => {
        charCount = textBox.trim().length;
        
        if (charCount > 200) disableSubmitBtn('Only 200 characters or less allowed')
        else if (charCount == 0) disableSubmitBtn('Text Box cannot be blank')
        else {
            if ((fullname.trim().length >= 3) && (/\S+@\S+\.\S+/.test(email))) enableSubmitBtn()
            else disableSubmitBtn('Please enter valid credentials')
        }
    }

    const disableSubmitBtn = (msg) => {
        document.querySelector('#submit-btn').disabled = true;
        errorMessage = msg;
    }

    const enableSubmitBtn = () => {
        document.querySelector('#submit-btn').disabled = false;
        errorMessage = '';
    }

    const postData = async () => {
        document.querySelector('#submit-btn').disabled = true;
        const res = await fetch('/api/reviews/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: fullname, stars: starCount, email, comment: textBox})
        });

        if (res.ok) location.href = '/reviews'
    }

    const loadMore = async () => {
        let temp = reviews;
        tempLength = reviews.length;
        
        const res = await fetch(`/api/reviews?update=true&order=${selection}`);

        if (res.ok) {
            res.json().then(docs => {
                if (docs.reviews.length == 0) {
                    end = true;
                    tempLength = 0;
                }
                else {
                    if (overwrite) reviews = temp.concat(docs.reviews)
                    else {
                        overwrite = true; // prevents overwriting/duplication of data
                        loadMore(); // required for first time
                    }
                }
            })
        }
    }


  </script>
  <Cart
      bind:hideCart
  />

  <Testimonials
      bind:reviews
      bind:showModal
      bind:selection
      bind:overwrite
      bind:updateRevs
  />

{#if reviews.length <= tempLength}
    <!-- Spinner Loader -->
    <div in:fade="{{duration: 300}}" class="top-0 right-0 padding-3 w-screen z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
    </div>    
{/if}

{#if !end}
<div class="text-center">
    <button on:click="{loadMore}" class="text-xl mt-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
        Load more
    </button>
</div>
{/if}

{#if showModal}
    <!-- Write a Review Modal -->
<div  in:fade out:fade id="abs" class="fixed top-0 min-h-screen flex items-center w-full justify-center bg-gray-200/50 dark:bg-semi-gray py-12 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
    <div class="mt-12 max-w-md w-full space-y-8 p-10 bg-white dark:bg-dark-bg rounded-xl shadow-lg z-10">
    <div class="grid  gap-8 grid-cols-1">
    <div class="flex flex-col">
            <div class="flex flex-col sm:flex-row items-center">
                <h2 class="font-semibold dark:text-dark-p dark:placeholder:text-input-border text-lg mr-auto">Write a review</h2>
                <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
            </div>
            <div class="mt-5">
                <div class="form">
                    
                        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Your Name</label>
                                <input on:keyup="{checkValidity}" placeholder="Full Name" type="text" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" bind:value={fullname} required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                            <div class="mb-3 space-y-2 w-full text-xs">
                                <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Your  Email</label>
                                <input on:keyup="{checkValidity}" placeholder="Valid Email ID" type="email" class="appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg h-10 px-4" bind:value={email} required="required" name="integration[shop_name]" id="integration_shop_name">
                                <p class="text-red text-xs hidden">Please fill out this field.</p>
                            </div>
                        </div>
                        
                            <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                <div class="w-full flex flex-col mb-3">
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Select Stars</label>
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
                                    <label class="font-semibold text-gray-600 dark:text-dark-p dark:placeholder:text-input-border py-2">Comment</label>
                                    <textarea on:keyup="{checkValidity}" bind:value="{textBox}" id="text-box" required="required" name="message" class="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter dark:bg-dark-body-bg text-grey-darker dark:text-dark-p dark:placeholder:text-input-border border border-grey-lighter border-input-border rounded-lg  py-4 px-4" placeholder="Write a brief review of less than 200 characters" spellcheck="false"></textarea>
                                    <p class="text-xs text-gray-400 dark:text-char-count text-left my-3">You inserted { charCount } characters</p>
                                </div>
                                <p class="text-xs text-red-500 dark:text-red-300 text-right my-3">{ errorMessage }</p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                    <button on:click="{()=>showModal=false}" id="cancel-btn" class="mb-2 md:mb-0 bg-transparent px-5 py-2 text-sm shadow-sm font-medium tracking-wider border dark:border-input-border text-gray-600 dark:text-list-item rounded-full hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600"> Cancel </button>
                                    <button on:click="{postData}" id="submit-btn" disabled class="disabled:bg-gray-300 dark:disabled:bg-dark-border-gray mb-2 md:mb-0 bg-indigo-500 dark:bg-dark-indigo px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg disabled:shadow-sm hover:bg-indigo-600 dark:hover:bg-indigo-800">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
{/if}

<style>
    
    #star-set {
        cursor: pointer;
    }
    #submit-btn {
        transition: all 0.3s ease;
    }
    .padding-3 {
        padding: 5rem;
    }
    input {
        outline: none;
    }
    #text-box {
        outline: none;
    }
</style>