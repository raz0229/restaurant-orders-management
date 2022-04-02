import { auth } from "$lib/config/app"
import { onAuthStateChanged } from "firebase/auth"

export async function get() {
   
    onAuthStateChanged(auth, (user) => {

        if (user) {
            console.log('I am signed in')
            // user is sgined in
            return {
                status: 301,
                redirect: '/admin/dashboard'
            }
        } else {
            // else: user is signed out
            console.log('I am signed out')
            return {
                status: 503
            }
        }

    });
   
  }