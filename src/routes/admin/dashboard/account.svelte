<script>
    import { getContext } from "svelte";
    
    const user = getContext('user-details');
    let userImpl;

    user.subscribe( cred => {
        userImpl = cred;
    })
</script>

<svelte:head>
  <title> Account | Admin </title>
</svelte:head>


<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
    <div class="flex flex-wrap text-center justify-center">
      <div class="w-full lg:w-6/12 px-4">

        <h2 class="text-4xl font-semibold text-black">Account</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
            You can simply change your account's email or password through the Account page. Make sure you use a strong password to save it from attackers.
        </p>
            <p>{ userImpl?.email }</p>
        </div>
    </div>
</div>