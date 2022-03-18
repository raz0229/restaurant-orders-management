import { writable } from 'svelte/store';
import { browser } from "$app/env"

export let cart = writable(true);
let storedItems;

if (browser) {
    storedItems = localStorage.getItem("cartItems");
}

export let cartItems = writable(storedItems);