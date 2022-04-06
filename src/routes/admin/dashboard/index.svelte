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
        if (doc.data()) arr.push(Object.assign(doc.data()));
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
        
</script>

  <!-- component -->
<!-- This is an example component -->
<div id="menu" class="mt-12 container mx-auto px-4 lg:pt-24 lg:pb-64">
  <div class="flex flex-wrap text-center justify-center">
    <div class="w-full lg:w-6/12 px-4">
      <h2 class="text-4xl font-semibold text-black">Orders</h2>
      <p class="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
        All the orders placed by your clients appear here in real-time. You can mark the order as 'taken' or delete the order if you wish 
      </p>
    </div>
  </div>
  <div class="flex flex-wrap mt-12 justify-center">
  <div class="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4">

    {#each orders as order, i}
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
    {/each}
    
  </div>
  </div>
</div>