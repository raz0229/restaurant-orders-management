<script>
    import Stars from "$lib/stars.svelte"
    import { fade } from "svelte/transition"
    import { createEventDispatcher } from "svelte";

    export let reviews, showButton = false, writeReviewButton = true, showDeleteButton = false;
    export let MAX_REVIEWS = 1; // set to 1 for reviews.length
    export let showModal, selection = 'title', overwrite = false;

    let confirmDelete = false, pendingDelete;
    const dispatch = createEventDispatcher()

    // how many reviews to display
    if (!(MAX_REVIEWS > reviews.length) && !(MAX_REVIEWS < 3)) reviews.length = MAX_REVIEWS;


    export const updateRevs = async () => {

        overwrite = false;
        reviews.length = 0;

        await fetch(`/api/reviews?order=${selection}`, { 
		  method: "GET",
		  mode: "cors",
		  cache: "no-cache",
		  credentials: "same-origin"
		}).then((res) => {
		  if (res.status == 200) {
			res.json().then((data) => {
                reviews = data.reviews;
			  })
            }
        })
    
    }

    
    const deleteReview = async (id, confirmed) => {
        pendingDelete = id;
        confirmDelete = true;

        if (confirmed) {
            // delte doc
            document.querySelector('#delete-spinner').classList.remove('hidden')
            dispatch('delete', {
			    id: pendingDelete
		    });
        }
    }

    const closeModal = () => {
        confirmDelete = false;
    }

</script>


<!-- Delete Modal -->
{#if confirmDelete}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
  <div class="bg-white rounded-lg lg:w-1/2 sm:w-80 m-2">
    <div class="flex flex-col items-start p-4">
      <div class="flex items-center w-full">
        <div class="text-gray-800 font-medium text-lg">Delete Review?</div>
		      <svg on:click="{closeModal}" class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" viewBox="0 0 18 18">
			      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
     	    </svg>
      </div>
      <hr>
      <div class="mt-2 mb-2 text-gray-600">You are about to delete this review from your Reviews page. Are you sure you want to continue?</div>
      <hr>
      <div class="ml-auto">
        <button on:click="{()=>deleteReview(pendingDelete, true)}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <span id="delete-spinner" class="animate-spin material-icons hidden" style="vertical-align: bottom;">
                loop
            </span>
            Delete
        </button>
        <button on:click="{closeModal}" class="bg-transparent hover:bg-gray-300 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
{/if}

{#if writeReviewButton}
    <div class="text-center">
        <button on:click="{()=>showModal=true}" class="text-xl mt-24 mb-10 bg-indigo-600 dark:bg-dark-indigo-button border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
            <span class="material-icons" style="vertical-align: text-bottom;">
                create
            </span> Write a Review
        </button>
    </div>
    <div class="py-4">
        <div class="w-full border-t border-gray-300 dark:border-dark-border-gray"></div>
    </div>
{/if}

<!-- component -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 mt-8">

  <!-- Heading -->
  <div class="w-full text-center pb-8">
    <svg class="mx-auto" width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.6153 19.154H10.1537C9.38437 19.154 8.73037 18.8849 8.19185 18.3463C7.65363 17.8078 7.38417 17.154 7.38417 16.3845V15.4619C7.38417 13.4233 8.10546 11.6831 9.54795 10.2406C10.9903 8.79859 12.7309 8.0773 14.7693 8.0773H16.6153C17.1152 8.0773 17.5477 7.89453 17.9133 7.52929C18.2786 7.16384 18.4613 6.73131 18.4613 6.23128V2.53864C18.4613 2.03872 18.2785 1.60578 17.9133 1.24034C17.5478 0.875398 17.1153 0.692322 16.6153 0.692322H14.7693C12.7691 0.692322 10.8608 1.08212 9.04327 1.86059C7.22595 2.63958 5.65404 3.69257 4.32694 5.01967C2.99994 6.34616 1.94726 7.91817 1.16837 9.7357C0.389491 11.553 0 13.4618 0 15.4618V35.769C0 37.3083 0.538216 38.6152 1.61515 39.6926C2.69219 40.7693 4.00019 41.3076 5.53856 41.3076H16.616C18.1542 41.3076 19.4618 40.7693 20.539 39.6926C21.6157 38.6152 22.1542 37.3083 22.1542 35.769V24.6926C22.1542 23.1536 21.6157 21.8466 20.5383 20.7692C19.4616 19.6925 18.1535 19.154 16.6153 19.154Z" fill="#2865E9"/>
        <path d="M46.3856 20.7692C45.309 19.6925 44.0013 19.154 42.4626 19.154H36.0011C35.2322 19.154 34.5776 18.8849 34.04 18.3463C33.5012 17.8078 33.2323 17.154 33.2323 16.3845V15.4619C33.2323 13.4233 33.9536 11.6831 35.3954 10.2406C36.8372 8.79859 38.5777 8.0773 40.6171 8.0773H42.4627C42.9627 8.0773 43.3955 7.89453 43.7608 7.52929C44.1258 7.16384 44.3092 6.73131 44.3092 6.23128V2.53864C44.3092 2.03872 44.1259 1.60578 43.7608 1.24034C43.3956 0.875398 42.9628 0.692322 42.4627 0.692322H40.6171C38.6158 0.692322 36.7079 1.08212 34.8899 1.86059C33.0729 2.63958 31.5015 3.69257 30.1744 5.01967C28.8473 6.34616 27.7941 7.91817 27.0155 9.7357C26.2368 11.553 25.8468 13.4618 25.8468 15.4618V35.769C25.8468 37.3083 26.3855 38.6152 27.4622 39.6926C28.5389 40.7693 29.8466 41.3076 31.3852 41.3076H42.462C44.0006 41.3076 45.3082 40.7693 46.3849 39.6926C47.4623 38.6152 47.9999 37.3083 47.9999 35.769V24.6926C48 23.1535 47.4623 21.8466 46.3856 20.7692Z" fill="#2865E9"/>
    </svg>

    <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 dark:text-light-header pb-2">
        Find customers opnion on us
    </h1>
    <p class="text-gray-400 dark:text-dark-p font-normal text-base">Happy reviews by our happy customers. So, sit back, relax and watch your favorite TV show while we work on your order. You can post your own review here on our site through the Reviews page.</p>
</div>


{#if !showButton}
<div>
    <span class="text-gray-600 dark:text-list-item">Sort By:</span>
    <span class="rounded-sm">
        <select class="bg-gray-200 dark:bg-dark-border dark:text-list-item p-1 rounded-md" 
            bind:value="{selection}" on:change="{updateRevs}">
            <option value="title">Name</option>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest</option>
        </select>
    </span>
</div>
{/if}



    <div in:fade out:fade class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
       
        {#each reviews as rev}
        <div class="relative bg-white dark:bg-dark-bg rounded-lg p-6">
            
            {#if showDeleteButton}
            <div on:click="{()=>deleteReview(rev.doc_id, false)}"
                class="absolute shadow-lg z-20 right-2 top-2 cursor-pointer bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                <span class="material-icons" style="vertical-align: bottom;">
                    delete_outline
                    </span>
             </div>
            {/if}

            <div class="flex flex-wrap items-center space-x-6 mb-4">
                <span class="material-icons h-28 w-28 pl-4 dark:text-review-title object-cover object-center text-8xl">
                    account_circle
                    </span>
                <div>
                    <p class="text-xl text-gray-700 dark:text-review-title font-normal">{rev.title}</p>
                    <p  on:click="{()=>location.href=`mailto:${rev.email}`}"
                        class="rev-email text-sm text-indigo-400 fonr-normal mb-1"><em>{rev.email}</em></p>
                    <p class="text-base text-gray-400 font-normal">
                        <Stars stars={rev.stars}/>
                    </p>
                </div>
            </div>
            <div>
                <p class="text-gray-500 dark:text-review-title leading-loose font-normal text-base">{ rev.comment }</p>
                <p class="text-sm text-gray-400 font-normal">{rev.date}</p>
            </div>
        </div>
        {/each}
     

    </div>

    {#if showButton}
    <div class="text-center">
        <button on:click="{()=>location.href='/reviews'}" class="text-xl mt-12 bg-indigo-600 dark:bg-dark-indigo-button border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
            Load all reviews
        </button>
    </div>
    {/if}

</section>

<style>
    .rev-email {
        cursor: pointer;
    }
    .rev-email:hover {
        text-decoration: underline;
    }
    .bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>