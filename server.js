const express = require('express')
const next = require('next')
const axios = require('axios')
const cheerio = require('cheerio')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const PORT = process.env.PORT || 3000

const bodyParser = require('body-parser')

nextApp.prepare().then(() => {
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

  app.use('/api/live-updates', (req, res) => {
    axios.get('https://www.thedp.com/article/2020/03/penn-coronavirus-live-updates').then(resp => {
      const { status } = resp
      if (status === 200) {
        const { data: html } = resp
        const $ = cheerio.load(html)
        const updatesList = []
        $('strong').each((idx, elt) => {
          
          const text = $(elt).text()
          if (updatesList.length <= 2 && text !== "RELATED:") {
            updatesList.push($(elt).text())
          }
        })

        const allText = $('p').text()

        const string0Idx = allText.indexOf(updatesList[0])
        const string1Idx = allText.indexOf(updatesList[1])
        const string2Idx = allText.indexOf(updatesList[2])
        const update1 = allText.substring(string0Idx + updatesList[0].length, string1Idx)
        const update2 = allText.substring(string1Idx + updatesList[1].length, string2Idx)
        const result = [{ title: updatesList[0], content: update1 }, { title: updatesList[1], content: update2 }]
        res.status(200).json(result)
      }
    })
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})