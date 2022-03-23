<script>
    import Stars from "$lib/stars.svelte"

    export let reviews, showButton = false;
    export let MAX_REVIEWS = 1; // set to 1 for reviews.length
    export let showModal, selection = 'title';

    // how many reviews to display
    if (!(MAX_REVIEWS > reviews.length) && !(MAX_REVIEWS < 3)) reviews.length = MAX_REVIEWS;

</script>
{#if !showButton}
    <div class="text-center">
        <button on:click="{()=>showModal=true}" class="text-xl mt-24 mb-10 bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
            <span class="material-icons" style="vertical-align: text-bottom;">
                create
            </span> Write a Review
        </button>
    </div>
    <div class="py-4">
        <div class="w-full border-t border-gray-300"></div>
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

    <h1 class="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 pb-2">
        Find customers opnion on us
    </h1>
    <p class="text-gray-400 font-normal text-base">Happy reviews by our happy customers. So, sit back, relax and watch your favorite TV show while we work on your order. You can post your own review here on our site through the Reviews page.</p>
</div>


{#if !showButton}
<div>
    <span class="text-gray-600">Sort By:</span>
    <span class="rounded-sm">
        <select class="bg-gray-200 p-1 rounded-md" bind:value="{selection}">
            <option value="title">Name</option>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest</option>
        </select>
    </span>
</div>
{/if}



    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each reviews as rev}
        <div class="bg-white rounded-lg p-6">
            <div class="flex items-center space-x-6 mb-4">
                <span class="material-icons h-28 w-28 pl-4 object-cover object-center text-8xl">
                    account_circle
                    </span>
                <div>
                    <p class="text-xl text-gray-700 font-normal">{rev.title}</p>
                    <p  on:click="{()=>location.href=`mailto:${rev.email}`}"
                        class="rev-email text-sm text-indigo-400 fonr-normal mb-1"><em>{rev.email}</em></p>
                    <p class="text-base text-gray-400 font-normal">
                        <Stars stars={rev.stars}/>
                    </p>
                </div>
            </div>
            <div>
                <p class="text-gray-500 leading-loose font-normal text-base">{ rev.comment }</p>
                <p class="text-sm text-gray-400 font-normal">{rev.date}</p>
            </div>
        </div>
        {/each}

    </div>

    {#if showButton}
    <div class="text-center">
        <button on:click="{()=>location.href='/reviews'}" class="text-xl mt-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
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
</style>