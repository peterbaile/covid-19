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
  width: 60%;
  margin: 1rem 0;
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

const ArticleWrapper = s.div`
  margin-top: 1rem;
`

const HeadlineText = s.h4`
  margin-top: 0.5rem;
  color: #283033;
  font-family: 'Playfair Display', serif;
`

const AbstractText = s.div`
  margin-top: 0.5rem;
  color: #707070;
  font-family: 'Georgia', serif;
`

const UpdateWrapper = s.div`
  margin-top: 1rem;
  background: #F5F5F5;
`

const IMAGE_URL = (attachment_uuid, extension) =>
  `https://snworksceo.imgix.net/dpn/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`

const Article = article => {
  console.log(article)
  const { abstract, headline, dominantMedia } = article.article
  const {
    attachment_uuid,
    created_at,
    extension,
    content: imageContent
  } = dominantMedia

  if (!article) return null

  return (
    <ArticleWrapper>
      <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} />
      <HeadlineText> {headline} </HeadlineText>
      <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} />
    </ArticleWrapper>
  )
}

const LiveUpdate = update => {
  return (
    <UpdateWrapper>
      dummy
    </UpdateWrapper>
  )
}

const Home = () => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    axios.get('/api/fetch?url=https://www.thedp.com/section/news.json').then(resp => {
      const { data } = resp
      console.log(resp.data)
      setArticles(data.articles.slice(0, 2))
    })
  }, [])

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>COVID-19 | The Daily Pennsylvanian</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}

        <meta property="og:title" content="COVID-19 | The Daily Pennsylvanian"/>
        {/* <meta property="og:image" content="https://snworksceo.imgix.net/dpn/9ae93a96-5757-4a4c-b43e-299c186a6f92.sized-1000x1000.png" /> */}
        {/* <meta property="og:description" content="Your guide to living at Penn"/> */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://thedp-covid-19.herokuapp.com/"/>

        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="COVID-19 | The Daily Pennsylvanian"/>
        {/* <meta name="twitter:image" content="https://snworksceo.imgix.net/dpn/9ae93a96-5757-4a4c-b43e-299c186a6f92.sized-1000x1000.png" /> */}
        {/* <meta name="twitter:description" content="Your guide to living at Penn"/> */}
        <meta name="twitter:url" content="https://thedp-covid-19.herokuapp.com/"/>
        <meta name="twitter:site" content="@dailypenn"/>
      </Head>

      <Background>
        <CoverImg src="/img/Covering-COVID.png" className="img-fluid" />
      </Background>

      <LatestDiv className="container">
        <div className="row">
          <div className="col-md">
            <Title> Latest Stories </Title>
            {articles && articles.map(article => <Article article={article} />)}
          </div>
          <div className="col-md">
            <Title> Live Updates </Title>
            <LiveUpdate />
          </div>
        </div>
      </LatestDiv>
      
    </div>
  )
}

export default Home
