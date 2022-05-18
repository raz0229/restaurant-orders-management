import { db, auth, client } from "$lib/config/app";
import { collection, getDocs, query, doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"

const groupQuery = `*[_type == "group"]
{
  title,
  sizes,
  priority,
  products[]->{
    _id,
    title,
    prices,
    "img" : image.asset->url
  }
}`;

// exports
export const getDeals = async () => {
  let arr = [];
  const ref = collection(db, 'deals')
  try {
    const querySnapshot = await getDocs(query(ref));
    querySnapshot.forEach((doc) => {
      arr.push(Object.assign(doc.data()));
    });
    return arr;
  } catch (e) {
    return arr;
  }
}

export const getTotal = async (col) => {
  const ref = collection(db, col)
  try {
    const qs = await getDocs(query(ref))
    return qs.size
  } catch (e) {
    return -1;
  }
}

export const getActiveHours = async () => {
  const ref = doc(db, "settings", "active-hours");
  const snap = await getDoc(ref);
  const hour = new Date().getUTCHours();

  if (snap.exists()) {
    return new Promise((resolve) => {
      if ((hour >= snap.data().startUTC) && (hour <= snap.data().endUTC)) resolve(true)
      resolve(false)
    })
  }
}

export const getSettings = async (field) => {
  const ref = doc(db, "settings", field);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data().val;
  }
  return undefined;
}

export const setSettings = async (field, newVal) => {
  const ref = doc(db, "settings", field);

  return new Promise (async (resolve, reject) => {
    try {
      await updateDoc(ref, {
        val: newVal
      });
      resolve(200)
    } catch (e) {
      reject(400)
    }
  })
}

export const getUTCHours = async () => {
  const ref = doc(db, "settings", 'active-hours');
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return [ snap.data().startUTC, snap.data().endUTC ];
  }
  return undefined;
}

export const setUTCHours = async (startUTC, endUTC) => {
  const ref = doc(db, "settings", 'active-hours');
  
  return new Promise (async (resolve, reject) => {
    try {
      await updateDoc(ref, {
        startUTC,
        endUTC
      })
      resolve(200)
    } catch (e) {
      reject(400)
    }
  })
}

export const getMetadata = (id, arr, size, qnt) => {
  let item = arr.find(x => x.id.toString() == id)
  let price, title = item.title;

  if (item) {
    switch (size) {
      case 's':
        price = item.prices[0] * parseInt(qnt);
        title = `${item.title} (${item.sizes[0]})`;
        break;
      case 'm':
        price = item.prices[1] * parseInt(qnt);
        title = `${item.title} (${item.sizes[1]})`;
        break;
      case 'l':
        price = item.prices[2] * parseInt(qnt);
        title = `${item.title} (${item.sizes[2]})`;
        break;
      default:
        price = item.price * parseInt(qnt) || item.prices[0] * parseInt(qnt);
        break;
    }
    return [price, title, item.content ? item.content : []];
  }

  return -1;
}


export const getProductsPopulatedWithPrices = async () => {

  const groups = await client.fetch(groupQuery)
  return new Promise(resolve => {
    resolve(groups)
  })

}

export const getAllProducts = async () => {
  const groups = await client.fetch(groupQuery)
  return new Promise(resolve => {
    let arr = [];
    groups.forEach(group => {
      group.products.forEach(product => {
        arr.push(Object.assign({
          id: product._id,
          img: product.img,
          prices: product.prices,
          title: product.title,
          sizes: group.sizes
        }));
      })
    });
    resolve(arr)
  })
}

export const isSignedIn = async () => {
  return new Promise(async resolve => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve({ user })
      } else {
        resolve(null);
      }

    });
  })
}
