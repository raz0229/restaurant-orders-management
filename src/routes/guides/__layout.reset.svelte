<script>
  import Title from '$lib/title.svelte'
  import '../styles/global.css'
</script>

<header>
    <Title title="My Business" />
    <div class="links">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/guides">Guides</a>
    </div>
</header>
<main>
  <slot></slot>
</main>
<footer>
  <p>Copyright 2022 Ninja Gaming Guides</p>
</footer>

<style>
  footer {
    text-align: center;
  }
</style>