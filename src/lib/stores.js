import { writable } from 'svelte/store';
import { browser } from "$app/env"

export let cart = writable(true);
let storedItems, mode;

if (browser) {
    storedItems = localStorage.getItem("cartItems");
    mode = localStorage.getItem('mode')
}

export let cartItems = writable(storedItems);
export let theme = writable(mode || 'light'); 