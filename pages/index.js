import Head from 'next/head'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import s from 'styled-components'

const Background = s.div`
  background-image: url('/img/dark-background.png');
  border: 1px solid #707070;
  opacity: 1;
  text-align: center;
`

const CoverImg = s.img`
  width: 50%;
  padding: 51px;
`

const Title = s.div`
  border-left: 12px solid #D12D4A;
  padding: 0rem 1rem;
  text-align: left;
  font-size: 30px;
  font-family: 'Libre Franklin', sans-serif;
  letter-spacing: 0px;
  color: #283033;
  opacity: 1;
`

const LatestDiv = s.div`
  margin-top: 2rem;
`

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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background>
        <CoverImg src="/img/Covering-COVID.png" className="img-fluid" />
      </Background>

      <LatestDiv className="container">
        <div className="row">
          <div className="col-md">
            <Title> Latest Stories </Title>
          </div>
          <div className="col-md">
            <Title> Live Updates </Title>
          </div>
        </div>
      </LatestDiv>

      {articles && articles[0].abstract}
      
    </div>
  )
}

export default Home
