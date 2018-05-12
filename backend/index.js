//Load the .env file
require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const uuidv4 = require('uuid/v4')
const morgan = require('morgan')
const database = require('./database')

const s3 = new AWS.S3()

app.use(bodyParser.json({limit: '4mb'}))
app.use(morgan('tiny'))

app.get('/', (req, res) => res.send('Hello World!'))

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
        await database.createListing(Object.assign(req.body, {img: filename}))

        res.status(201).send({
          img: `${uuid}.jpg`
        })
      })()

      console.log(`Successfully uploaded image: ${uuid}.jpg`)
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
