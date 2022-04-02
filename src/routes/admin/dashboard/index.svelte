<script>
  import { isSignedIn } from "$lib/config/controllers"
  import { browser } from "$app/env"
  
  let user;

  const checkState = async () => {
    const signedIn = await isSignedIn()
    if (!signedIn) location.href = '/admin'
    else user = signedIn
  }

  if (browser) checkState()
</script>

<h1 class="mt-16">
    Admin Dashboard
</h1>
<p>{ user }</p>