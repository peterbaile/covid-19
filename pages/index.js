import Head from 'next/head'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    axios.get('/api/fetch?url=https://www.thedp.com/section/news.json').then(resp => {
      const { data } = resp
      console.log(resp.data)
      setArticles(data.articles)
    })
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {articles && articles[0].abstract}
      
    </div>
  )
}

export default Home
