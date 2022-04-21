<script>
  // import db
import { db } from "$lib/config/app";
import { doc, onSnapshot, collection, where, updateDoc, deleteDoc, getDocs, query, orderBy, limit, startAfter, startAt, endAt } from "firebase/firestore";
import { fly, fade } from "svelte/transition"

let fetchLimit = 20, orders = [], searchKey = '';
let confirmDelete = false, pendingDelete = '', filterValue = 'all', searchValue = 'title', loadFilter = false, toggleLatest = false;
let lastVisible = null, overwrite = false;

const getDocuments = async (update) => { 
    let arr = [], filter;
    const ref = collection(db, 'orders')

    let sr = toggleLatest ? 'oldest' : 'latest'; // sort by default is by latest 

    switch (filterValue) {
    case 'checked':
      filter = where('status', '==', true);
      break;
    case 'unchecked':
      filter = where('status', '==', false);
      break;
    default:
      filter = null;
  }
    //start working here
    searchKey = 'raja Abdullah'.toLowerCase();
    let q = query(ref, orderBy(sr), where(searchValue, '==', searchKey), startAfter(lastVisible || null), limit(fetchLimit));  // default limit is 20 orders with no filter
    
    if (filter !== null) q = query(ref, filter, orderBy(sr), startAfter(lastVisible || null), limit(fetchLimit));

    const querySnapshot = await getDocs(q);
    if (update) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
    querySnapshot.forEach((doc) => {
        if (doc.data()) arr.push(Object.assign(doc.data(), {id: doc.id}));
    });
    return arr;
}

// let sort = 'latest'; // sort by default is by latest 

//     let update;     // if true, next limit of data will be sent back
//     if (false) update = true;
//     else {
//         update = false
//         lastVisible = null
//     }
    
//     getDocuments(sort, update, lastVisible).then( order => {
//       orders = order;
//       console.log('orderrs: ', orders)
//     }).catch(e => {
//       console.log('exception: ', e.message)
//     })
        
let collapsible = (id) => {
  let elem = document.querySelector(`#${id.trim()}`);
  elem.checked = elem.checked ? false : true;
}

const unsubscribe = onSnapshot(collection(db, "orders"), () => {
  
  // watch for changes and restore orders
    getDocuments(false).then( order => {
      orders = order.slice();
    }).catch(e => {
      console.log('exception: ', e.message)
    })
});

const capitalize = (mySentence) => {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

const markChecked = async (id, e) => {

  e.target.children[1].classList.add('hidden'); // hide check mark
  e.target.children[0].classList.remove('hidden'); // unhide loading

  const label = document.querySelector(`#lb-${ id }`) 
  const status = label.dataset.status == 'true' ? false : true;
  const ref = doc(db, "orders", id);
  
  await updateDoc(ref, {
    status
  })
  
  e.target.children[1].classList.remove('hidden'); // unhide check mark
  e.target.children[0].classList.add('hidden'); // hide loading
}

const filterOrders = () => {
  loadFilter = true;
  lastVisible = null;
  overwrite = false;
  getDocuments(false).then( order => {
    if (order.length !== 0) document.querySelector('#loadMore').disabled = false;
      orders = order.slice();
      loadFilter = false;
    }).catch(e => {
      console.log('exception: ', e.message)
    })
}

const loadMore = () => {
  loadFilter = true;

  getDocuments(true).then( order => {
      loadFilter = false;

      if (order.length === 0) document.querySelector('#loadMore').disabled = true;

      if (overwrite) orders = orders.concat(order.slice());
      else {
          overwrite = true; // prevents overwriting/duplication of data
          loadMore(); // required for first time
      }

    }).catch(e => {
      console.log('exception: ', e.message)
    })
}

const deleteOrder = (id, e) => {
  e.target.children[1].classList.add('hidden'); // hide check mark
  e.target.children[0].classList.remove('hidden'); // unhide loading

  const label = document.querySelector(`#lb-${ id }`) 
  const status = label.dataset.status == 'true' ? true : false;

  if (status) deleteSingleDoc(id); // delete order immediately if marked as Checked
  else {
    pendingDelete = id;
    confirmDelete = true;
  }

  e.target.children[0].classList.add('hidden'); // unhide check mark
  e.target.children[1].classList.remove('hidden'); // hide loading
}

const deleteSingleDoc = async (id) => {
  await deleteDoc(doc(db, "orders", id));
}

const handleModal = () => {
  deleteSingleDoc(pendingDelete)
  confirmDelete = false;
}

const closeModal = () => {
  confirmDelete = false;
}

</script>

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
  <div class="flex flex-wrap text-center justify-center">
    <div class="w-full lg:w-6/12 px-4">
      <h2 class="text-4xl font-semibold text-black">Orders</h2>
      <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
        All the orders placed by your clients appear here in real-time. You can mark the order as 'taken' or delete the order if you wish 
      </p>

<!-- Search bar component -->
<div class="pt-2 inline-block relative mx-auto text-gray-600">
  <input bind:value="{ searchKey }" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-400"
    type="search" name="search" placeholder="Search">
  <button on:click="{()=>alert('Submitted')}" type="submit" class="absolute focus:outline-none right-4 top-0 mt-5 mr-4">
    <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
      viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
      width="512px" height="512px">
      <path
        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    </svg>
  </button>
  <select bind:value="{searchValue}" class="absolute right-1 top-1 mt-4 mr-1 focus:outline-none" style="background: none; content-visibility: hidden;">
    <svg class="w-2 h-2 m-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
    <option value="title">By Name</option>
    <option value="phone">By Phone</option>
  </select>
</div>

    </div>
  </div>
  <div class="mt-12">

<div class="p-4 flex justify-between">

  <div class="relative w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <span class="w-full">
      <input bind:checked="{toggleLatest}" on:change="{filterOrders}" type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
      <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
    </span>
    <p class="latest-content pointer-events-none text-xs text-gray-600">Oldest</p>
  </div>


<div class="relative inline-flex">
  <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select bind:value="{filterValue}" on:change="{filterOrders}" 
    class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
    <option value="all">Show All</option>
    <option value="checked">Checked</option>
    <option value="unchecked">Unchecked</option>
  </select>
</div>

</div>

{#if orders.length === 0}
  <div class="m-2 1items-center text-gray-500">
    <p><em>There are no orders to display</em></p>
  </div>

{:else}


{#if loadFilter}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
    <div class="absolute m-4 text-gray-100" style="text-align: -webkit-center;">
      <img class="w-2/4" src="../buffer.svg" alt="">
    </div>
  </div>
{/if}

{#each orders as order}
<section out:fly="{{ y: -200, duration: 2000 }}" in:fly="{{ y: -200, duration: 1000 }}" class="accordion p-3">
  <!-- Since order.id is unique to each object, we shall use it as element ID-->
  <input type="checkbox" name="collapse" id="id-{ order.id }" checked="{false}">
  <div class="handle" on:click="{()=>collapsible(`id-${ order.id }`)}" >
    <!-- If status == true -->
    
    <h3 class:bg-checked="{ order.status }" id="lb-{ order.id }" data-status="{ order.status }" 
       > 
      <!-- for="id-{ order.id }" on:click="{()=>collapsible(`id-${ order.id }`)}" -->
      <span class="material-icons va-b">
        expand_more
        </span>
        &nbsp;
      {#if !order.status}
        { capitalize(order.title) }
      {:else}
        <em><s><b>{ capitalize(order.title) }</b></s></em>
      {/if}
      
      </h3>

    <p class="bg-gray-100 text-gray-500 text-sm p-2">
      <span class="material-icons text-red-800 va-b">
        home
        </span> &nbsp; { order.address }</p>
    <p class="bg-white text-gray-500 text-sm p-2">
      <span class="material-icons text-blue-400 va-b">
        phone
        </span> &nbsp; { order.phone }</p>
    <p class="bg-gray-100 text-gray-500 text-sm p-2">
      <span class="material-icons text-green-600 va-b">
        payments
        </span> &nbsp; { order.total } PKR</p>
    
    <!-- Show Notes if exist -->
    {#if order.notes.trim().length !== 0}
    <p class="bg-white text-gray-500 text-sm p-2">
      <span class="material-icons text-gray-400 va-b">
        receipt
        </span> &nbsp; <em>{ order.notes }</em></p>
    {/if}
        
    </div>
  <div class="content text-gray-600" on:click="{()=>collapsible(`id-${ order.id }`)}">

    {#each order.content as cnt}
    <div class="item">
      <p><strong>Item:</strong> &nbsp; { cnt.title }</p>
      <p><strong>Quantity:</strong> &nbsp; { cnt.qnt }</p>
      <p><strong>Price:</strong> &nbsp; { cnt.price }</p>
    </div>

    {#if cnt.type == 'deal'}
      {#each cnt.content as item, i}
      <div class="deal bg-gray-100 text-gray-500 p-3 ml-6">
        <p><strong>{ i+1 } .</strong> &nbsp; { item }</p>
      </div>
      {/each}
    {/if}

    {/each}
  </div>
  
  <div class="relative flex justify-between p-2">
    <p class="text-gray-400 timestamps"><em>{ order.time }</em></p>
    <div class="absolute right-1 top-2 cursor-pointer">
      <span on:click="{ ()=>markChecked(order.id, event) }" 
        class="p-1 text-green-500 hover:bg-green-200 rounded">
        <span class="hidden animate-spin pointer-events-none material-icons va-b">
          autorenew
          </span>
        <span class="pointer-events-none material-icons va-b">
         done
        </span></span>
      <span on:click="{ ()=>deleteOrder(order.id, event) }" 
        class="text-red-700 hover:bg-red-200 p-1 rounded">
        <span class="hidden animate-spin pointer-events-none material-icons va-b">
          autorenew
          </span>
        <span class="pointer-events-none material-icons va-b">
          delete
          </span>
      </span>
    </div>
  </div>
</section>
{/each}


<div class="text-center">
  <button on:click="{loadMore}" id="loadMore" class="text-xl mt-12 bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-white hover:bg-indigo-700">
      Load more
  </button>
</div>

{/if}

<!-- Delete Modal -->
{#if confirmDelete}
<div in:fade out:fade class="z-30 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-modal">
  <div class="bg-white rounded-lg lg:w-1/2 sm:w-80 m-2">
    <div class="flex flex-col items-start p-4">
      <div class="flex items-center w-full">
        <div class="text-gray-800 font-medium text-lg">Delete Order?</div>
		      <svg on:click="{closeModal}" class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer" viewBox="0 0 18 18">
			      <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
     	    </svg>
      </div>
      <hr>
      <div class="mt-2 mb-2 text-gray-600">The order you have decided to delete is marked as 'Unchecked'. Are you sure you want to continue?</div>
      <hr>
      <div class="ml-auto">
        <button on:click="{handleModal}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
        <button on:click="{closeModal}" class="bg-transparent hover:bg-gray-300 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
{/if}


  </div>
</div>

<style>
  
.va-b {
  vertical-align: bottom;
}

.timestamps {
  font-size: 13px;
}

.item {
  border-top: dotted 2px gray;
  border-left: solid 6px grey;
  padding: 10px 10px;
}

.deal {
  border-left: solid 6px slateblue;
}

.bg-modal {
  background-color: rgba(0, 0, 0, 0.6);
}
.toggle-label {
    transition: background-color 0.3s ease;
  }

  .toggle-checkbox:checked {
    right: 0;
    border-color: #6882d3;
  }
  .toggle-checkbox:checked + .toggle-label {
    background-color: #6883d3;
  }
#loadMore:disabled {
  background-color: #c9c9c9;
  pointer-events: fill;
}
  /*
 CSS for the main interaction
*/
.accordion > input[type="checkbox"] {
  position: absolute;
  left: -100vw;
}

.accordion .content {
  overflow-y: hidden;
  height: 0;
  transition: all 0.3s ease;
}

.accordion > input[type="checkbox"]:checked ~ .content {
  height: auto;
  overflow: visible;
}

.accordion h3 {
  display: block;
}

/*
 Styling
*/

.accordion {
  margin-bottom: 1em;
  border-top: dashed 3px #bbbaba;
}

.accordion > input[type="checkbox"]:checked ~ .content {
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-top: 0;
}

.accordion .handle {
  margin: 0;
  font-size: 1.125em;
  line-height: 1.2em;
}

.accordion h3 {
  color: #fff;
  cursor: pointer;
  font-weight: normal;
  padding: 15px 15px 15px 0;
  transition: background 0.3s ease;
  background: #4c4c4c;
}

.bg-checked {
  background: #801515 !important;
}

.accordion .handle h3:before {
  font-family: 'fontawesome';
  content: "\f054";
  display: inline-block;
  margin-right: 10px;
  font-size: .58em;
  line-height: 1.556em;
  vertical-align: middle;
}

.accordion > input[type="checkbox"]:checked ~ .handle h3:before {
  content: "\f078";
}


/*
 Demo purposes only
*/
*,
*:before,
*:after {
  box-sizing: border-box;
}

.accordion {
  max-width: 65em;
}

.accordion p:last-child {
  margin-bottom: 0;
}

@media only screen and (max-width: 920px) {
	  div#menu {
			padding-left: 5rem;
	  }
	  
  }
</style>