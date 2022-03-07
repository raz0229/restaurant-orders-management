<script>
  import Title from '$lib/title.svelte'
  import Footer from '$lib/footer.svelte'
  import '../styles/global.css'

  let businessName = "Pizza Home"
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