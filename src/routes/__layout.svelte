<script>
  import Title from "$lib/title.svelte";
  import Footer from "$lib/footer.svelte";
  import { setContext } from "svelte";
  import { page_title } from "$lib/stores";
  import { onMount } from "svelte";
  import "../styles/global.css";

  setContext("page_title", page_title);
  let businessName = import.meta.env.VITE_BUSINESS_NAME;

  onMount(() => {
    let chatbox = document.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", import.meta.env.VITE_FACEBOOK_PAGE_ID);
    chatbox.setAttribute("attribution", "biz_inbox");

    // <!-- Your SDK code -->
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v14.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
</script>

<svelte:head>
  <title>{$page_title} | {businessName}</title>
</svelte:head>

<!-- Messenger Chat plugin Code -->
<div id="fb-root" />
<!-- Your Chat plugin code -->
<div id="fb-customer-chat" class="fb-customerchat" />

<header>
  <Title title={businessName} />
</header>

<main>
  <slot />
</main>

<Footer title={businessName} />

<style>
</style>
