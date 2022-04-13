<script>
  // import db
import { db } from "$lib/config/app";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";

let orders = [];
let lastVisible = null;

const getDocuments = async (sr, update, doc) => { 
    let arr = [];
    const ref = collection(db, 'orders')
    const q = query(ref, orderBy(sr), startAfter(doc || null), limit(20));  // default limit is 20 orders

    const querySnapshot = await getDocs(q);
    if (update) lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    
    querySnapshot.forEach((doc) => {
        if (doc.data()) arr.push(Object.assign(doc.data(), {id: doc.id}));
    });
    return arr;
}

let sort = 'latest'; // sort by default is by latest 

    let update;     // if true, next limit of data will be sent back
    if (false) update = true;
    else {
        update = false
        lastVisible = null
    }
    
    getDocuments(sort, update, lastVisible).then( order => {
      orders = order;
      console.log('orderrs: ', orders)
    }).catch(e => {
      console.log('exception: ', e.message)
    })
        
let collapsible = (id) => {
  let elem = document.querySelector(`#${id.trim()}`);
  elem.checked = elem.checked ? false : true;
}

</script>

<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
  <div class="flex flex-wrap text-center justify-center">
    <div class="w-full lg:w-6/12 px-4">
      <h2 class="text-4xl font-semibold text-black">Orders</h2>
      <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
        All the orders placed by your clients appear here in real-time. You can mark the order as 'taken' or delete the order if you wish 
      </p>
    </div>
  </div>
  <div class="mt-12">

{#each orders as order}
    <section class="accordion">
      <!-- Since order.id is unique to each object, we shall use it as element ID-->
      <input type="checkbox" name="collapse" id="id-{ order.id }" checked="{false}">
      <div class="handle" on:click="{()=>collapsible(`id-${ order.id }`)}" >
        <!-- If status == true -->
        
        <label class:bg-checked="{ order.status }" for="id-{ order.id }" on:click="{()=>collapsible(`id-${ order.id }`)}">
          <span class="material-icons va-b">
            expand_more
            </span>
            &nbsp;
          {#if !order.status}
            { order.title }
          {:else}
            <em><strike>{ order.title }</strike></em>
          {/if}
          
        </label>

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
          <div class="deal bg-gray-100 text-gray-500 p-4 ml-6 mt-2">
            <p><strong>{ i+1 } .</strong> &nbsp; { item }</p>
          </div>
          {/each}
        {/if}

        {/each}
      </div>
      <div class="relative flex justify-between p-2">
        <p class="text-gray-400 timestamps"><em>{ order.time }</em></p>
        <div class="absolute right-1 top-2 cursor-pointer">
          <span class="p-1 text-green-500 hover:bg-green-200 rounded">
            <span class="material-icons va-b">
            done
            </span></span>
          <span class="text-red-700 hover:bg-red-200 p-1 rounded">
            <span class="material-icons va-b">
              delete
              </span>
          </span>
        </div>
      </div>
    </section>
{/each}


  <!-- <div class="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">

     -->
    <!-- {#each orders as order, i}
    <div class="col-span-2 sm:col-span-1 xl:col-span-1">
      {i} &bullet;
    </div>
    <div class="col-span-2 sm:col-span-4 xl:col-span-4">
      <h3 class="font-semibold text-black">{order.title}</h3>
      <p>
      { order.address }
      </p>
    </div>
    <div class="col-span-2 sm:col-span-1 xl:col-span-1 italic ">{order.total} PKR</div>
    {/each} -->
<!--     
  </div> -->
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
  border-top: dotted 2px gray;
  border-left: solid 6px slateblue;
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

.accordion label {
  display: block;
}

/*
 Styling
*/

.accordion {
  margin-bottom: 1em;
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

.accordion label {
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

.accordion .handle label:before {
  font-family: 'fontawesome';
  content: "\f054";
  display: inline-block;
  margin-right: 10px;
  font-size: .58em;
  line-height: 1.556em;
  vertical-align: middle;
}

.accordion > input[type="checkbox"]:checked ~ .handle label:before {
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