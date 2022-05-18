<script>
  import Title from '$lib/title.svelte'
  import Footer from '$lib/footer.svelte'
  import { setContext } from 'svelte';
  import { page_title } from '$lib/stores';
  import '../styles/global.css'
 
  setContext('page_title', page_title)
  let businessName = import.meta.env.VITE_BUSINESS_NAME;

</script>

<svelte:head>
   <title>{ $page_title } | { businessName }</title>
</svelte:head>

<header>
  <Title title={ businessName } />
  
</header>

<main>
  <slot></slot>
</main>

<Footer title ={ businessName }/>
<style>
</style>