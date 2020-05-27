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
      const $ = cheerio.load(s)
      const timeElt = $('p').toArray()[0]
      const contentElt = $('p').toArray()[1]
      const contentHTML = $.html(contentElt)
    
      if (!s.includes('Updated at')) return { content: contentHTML }
    
      const timeHTML = $.html(timeElt)
      return {
        content: contentHTML,
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
    
        const numUpdates = 4
    
        $('p').toArray().map(elt => {
          const pHTML = $.html(elt)
          allHTML += pHTML
          if (updatesList.length <= numUpdates && pHTML.includes('<strong>')) {
            updatesList.push(pHTML)
          }
        })
    
        const idxArray = updatesList.map(update => allHTML.indexOf(update))
    
        const processedUpdates = idxArray.map((updateIdx, idx) => {
          if (idx < idxArray.length - 1) {
            return allHTML.substring(updateIdx + updatesList[idx].length, idxArray[idx+1])
          }
        }).slice(0, 4)
    
        const returnList = processedUpdates.map((update, idx) => {
          let obj = extractTimestamp(update)
          obj.title = cheerio.load(updatesList[idx])('strong').text().trim()
          return obj
        })
    
        res.status(200).json(returnList)
      }
    }).catch(e => {
      console.log(e.message)
    })
  })

  app.all('*', (req, res) => handle(req, res))

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})