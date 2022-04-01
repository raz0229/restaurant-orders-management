<script context="module">
  // import { auth } from "$lib/config/app"
  // import { onAuthStateChanged } from "firebase/auth"

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log('user is signed in: ', uid)
  //   } else {
  //       console.log('user is signed out')
  //       return {
  //         status: 301,
  //         redirect: '/admin'
  //       }
  //     }

  //   });
    // export async function load({ page, fetch }) {
    //   const id = page.params.id
    //   const res = await fetch(`/guides/${id}.json`)
    //   const { guide } = await res.json()
  
    //   if (res.ok) {
    //     return {
    //       props: {
    //         guide
    //       }
    //     }
    //   }
  
    //   return {
    //     status: 301,
    //     // error: new Error('Could not fetch that guide')
    //     redirect: '/guides'
    //   }
    // }
</script>

<h1 class="mt-16">
    Admin Dashboard
</h1>