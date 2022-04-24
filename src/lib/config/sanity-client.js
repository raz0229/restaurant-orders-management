import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'm0mpwiez',
  dataset: 'production',
  apiVersion: '2021-03-24', // use current UTC date - see "specifying API version"!
  token: '', // auth token, or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

const query = '*[_type == "product"]'

client.fetch(query).then((products) => {
  console.log('Products: ')
  products.forEach((product) => {
    console.log(product + '\n')
  })
})