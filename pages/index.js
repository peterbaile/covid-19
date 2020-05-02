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
