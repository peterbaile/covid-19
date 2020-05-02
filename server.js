const express = require('express')
const next = require('next')
const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')

// require('dotenv').config()

nextApp.prepare().then(() => {
  console.log("!!!!!")

  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // api routing
  app.use('/api/fetch', async ({ query: { url = '' } }, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
      if (!url) throw new Error('No url param found in query')
      const { data } = await axios.get(url)
      res.status(200).json(data)
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})