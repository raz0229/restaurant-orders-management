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
      import { db } from "$lib/config/app";
      import { doc, deleteDoc } from "firebase/firestore";
      import { fade } from "svelte/transition"
      
      export let reviews;
  
    let updateRevs, tempLength = 0;
    let end = false, overwrite, selection;


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

    const deleteReview = async (event) => {
        await deleteDoc(doc(db, "reviews", event.detail.id));
        location.href = '/admin/dashboard/deals';
    }


  </script>

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">
        <h2 class="text-4xl font-semibold text-black">Reviews</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
          Testimonials from the reviews page appear here. You can delete the reviews that are either spam or contain inappropriate language. 
        </p>
  
        </div>
    </div>
</div>  


  <Testimonials on:delete={deleteReview}
      bind:reviews
      bind:updateRevs
      bind:selection
      bind:overwrite
      writeReviewButton={false}
      showDeleteButton={true}
      showButton={false}
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

<style>
    
</style>