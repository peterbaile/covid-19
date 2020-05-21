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
    const extractTimestamp = s => {
      if (!s.includes('Updated at')) return null
      const $ = cheerio.load(s)
      const timeElt = $('p').toArray()[0]
      const timeHTML = $.html(timeElt)
      return {
        content: s.replace(timeHTML, ''),
        timestamp: cheerio.load(timeHTML)('em').text()
      } 
    }

    axios.get('https://www.thedp.com/article/2020/03/penn-coronavirus-live-updates').then(resp => {
      const { status } = resp
      if (status === 200) {
        const { data: html } = resp
        const $ = cheerio.load(html)
        const updatesList = []
        let allHTML = ''

        $('p').toArray().map(elt => {
          const pHTML = $.html(elt)
          allHTML += pHTML
          if (updatesList.length <= 2 && pHTML.includes('<strong>')) {
            updatesList.push(pHTML)
          }
        })

        const string0Idx = allHTML.indexOf(updatesList[0])
        const string1Idx = allHTML.indexOf(updatesList[1])
        const string2Idx = allHTML.indexOf(updatesList[2])
        const update1 = allHTML.substring(string0Idx + updatesList[0].length, string1Idx)
        let obj1 = extractTimestamp(update1)
        if (!obj1) obj1 = { content: update1 }
        obj1.title = cheerio.load(updatesList[0])('strong').text()

        const update2 = allHTML.substring(string1Idx + updatesList[1].length, string2Idx)
        let obj2 = extractTimestamp(update2)
        if (!obj2) obj2 = { content: update2 }
        obj2.title = cheerio.load(updatesList[1])('strong').text()

        const result = [obj1, obj2]
        res.status(200).json(result)
      }
    })
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})