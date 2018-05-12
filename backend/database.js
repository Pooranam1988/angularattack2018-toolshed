const {Client} = require('pg')
const client = new Client()

let clientConnected = false;

(async () => {
  await client.connect()
  clientConnected = true
})()

const waitForClientToConnect = async () => {
  await new Promise(res => {
    let i = setInterval(() => {
      if (clientConnected) {
        clearInterval(i)
        res(true)
      }
    }, 100)
  })
}

module.exports = {
  create: async (listing) => {
    try {
      await waitForClientToConnect()
      await client.query('insert into listings (title, description, img) values ($1,$2,$3)', [listing.title, listing.description, listing.img])
    } catch (e) {
      console.trace(e)
    }
  },
  getAll: async () => {
    try {
      await waitForClientToConnect()
      const res = await client.query('select * from listings')
      return res.rows
    } catch (e) {
      console.trace(e)
    }
  }
}

