const {Client} = require('pg')
const client = new Client()

module.exports = {
  createListing: async (listing) => {
    try {
      await client.connect()
      await client.query('insert into listings (title, description, img) values ($1,$2,$3)', [listing.title, listing.description, listing.img])
      await client.end()
    } catch (e) {
      console.trace(e)
    }
  }
}

