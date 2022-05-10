<script>
  import Title from '$lib/title.svelte'
  import Footer from '$lib/footer.svelte'
  import '../styles/global.css'

  let businessName = import.meta.env.VITE_BUSINESS_NAME
</script>

<header>
  <Title title={ businessName } />
  
</header>

<main>
  <slot></slot>
</main>

<Footer title ={ businessName }/>
<style>
</style>