//Load the .env file
require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const morgan = require('morgan')
const database = require('./database')
const axios = require('axios')

const s3 = new AWS.S3()

app.use(bodyParser.json({limit: '4mb'}))
app.use(morgan('tiny'))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/listings', (req, res) => {
  (async () => {
    try {
      let listings = await database.getAll()

      await Promise.all(listings.map(l =>
        axios.get(`https://s3.amazonaws.com/angular-attack/${l.img}`)
          .then(({data}) => {
            Object.assign(l, {img: `data:image/png;base64,${data}`})
          })
          .catch((error) => {
            console.trace(error)
          })
      ))

      res.send({data: listings})
    } catch (e) {
      console.trace(e)
      res.status(500).send()
    }
  })()

})

app.post('/api/listings', (req, res) => {
  let uuid = uuidv4()

  const filename = `${uuid}.${req.body.filename}`

  console.log('Uploading image to S3!')
  s3.putObject({
    Bucket: 'angular-attack',
    Key: filename,
    Body: req.body.img,
    ACL: 'public-read'
  }, function (err, data) {
    if (err) {
      res.status(503).send()
      console.log(err.stack)
    } else {

      (async () => {
        await database.create(Object.assign(req.body, {img: filename}))

        res.status(201).send({
          img: `${uuid}.jpg`
        })
      })()

      console.log(`Successfully uploaded image: ${uuid}.jpg`)
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
