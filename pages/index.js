import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import s from 'styled-components'

const Background = s.div`
  background-image: url('/img/dark-background.png');
  border: 1px solid #707070;
  opacity: 1;
  text-align: center;
  margin-top: 5rem;
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
  font-weight: 900;
  letter-spacing: 0px;
  color: #283033;
  opacity: 1;
`

const SectionDiv = s.div`
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

const Footer = s.div`
  border: 1px solid #707070;
  background-color: #000000;
  color: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  padding: 1rem;
  font-size: 80%;
`

const Lines = s.div`
  border-top: 2px solid #707070;
  height: 0.5rem;
  border-bottom: 2px solid #707070;
`

const IMAGE_URL = (attachment_uuid, extension) =>
  `https://snworksceo.imgix.net/dpn/${attachment_uuid}.sized-1000x1000.${extension}?w=1000`

const NavbarWrapper = s.nav`
  font-size: 80%;
  font-family: 'Libre Franklin', sans-serif;
  position: fixed;
  z-index: 1;
`

const NavText = s.text`
  font-size: 80%;
  font-family: 'Libre Franklin', sans-serif;
  color: #283033;
`

const TimestampText = s.div`
  margin-top: 0.5rem;
  color: #696969	;
  font-family: 'Georgia', serif;
`
const StyledLink = s.a`
  color: #000000 !important;
  text-decoration: none !important;
`

const NavBar = () => {
  return (
    <NavbarWrapper class="navbar navbar-expand-lg">
      <div class="navbar-collapse w-100 dual-collapse2 order-1 order-md-0 collapse">
          <ul class="navbar-nav ml-auto text-center">
            <li class="nav-item active">
              <a class="nav-link" href="#"> <NavText> Latest Stories </NavText></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <NavText> Live Update </NavText></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"> <NavText> News</NavText> </a>
            </li>
          </ul>
      </div>
      <div class="mx-auto my-2 order-0 order-md-1 position-relative" style={{ textAlign: 'center' }}>
        <a class="mx-auto" href="#">
          <img src="/img/DP-Logo-Full.png" className="img-fluid" style={{ width: '60%' }} />
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-expanded="false">
            <span class="navbar-toggler-icon" style={{ borderColor: 'black' }}></span>
        </button>
      </div>
      <div class="navbar-collapse w-100 dual-collapse2 order-2 order-md-2 collapse">
        <ul class="navbar-nav mr-auto text-center">
          <li class="nav-item">
            <a class="nav-link" href="#"> <NavText> Timeline </NavText> </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"><NavText> Opinion </NavText></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> <NavText> 34th Street </NavText> </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> <NavText> Multimedia </NavText></a>
          </li>
        </ul>
      </div>
    </NavbarWrapper>
  )
}


const Article = article => {
  console.log(article)
  const { abstract, published_at, headline, dominantMedia, slug } = article.article
  const now = moment().subtract(16, 'hours')
  const {
    attachment_uuid,
    created_at,
    extension,
    content: imageContent
  } = dominantMedia

  if (!article) return null

  return (
    <StyledLink href={`https://www.thedp.com/article/${slug}`}>
    <ArticleWrapper>
      <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} />
      <HeadlineText> {headline} </HeadlineText>
      <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} />
      {/* change to human readable time */}
      <TimestampText> 
        {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment(published_at).fromNow()} 
      </TimestampText>
    </ArticleWrapper>
    </StyledLink>
  )
}

const SideArticle = article => {
  const { published_at, headline, dominantMedia, slug } = article.article
  const now = moment().subtract(16, 'hours')
  const {
    attachment_uuid,
    created_at,
    extension,
    content: imageContent
  } = dominantMedia

  if (!article) return null

  return (
    <StyledLink href={`https://www.thedp.com/article/${slug}`}>
    <ArticleWrapper>
      <div className = "row">
        <div className="col-md">
          <HeadlineText> { headline } </HeadlineText>
          <TimestampText> 
            {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment(published_at).fromNow()} 
          </TimestampText>
        </div> 
        <div className="col-md">
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} />
        </div> 
      </div>
    </ArticleWrapper>
    </StyledLink>
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
  const [newsCenterpiece, setNewsCenterpiece] = useState(null)
  const [newsArticles, setNewsArticles] = useState(null)
  const [opinionCenterpiece, setOpinionCenterpiece] = useState(null)
  const [opinionArticles, setOpinionArticles] = useState(null)

  useEffect(() => {
    axios.get('/api/fetch?url=https://www.thedp.com/section/news.json').then(resp => {
      const { data } = resp
      console.log(resp.data)
      setArticles(data.articles.slice(0, 1))
    })
    axios.get('/api/fetch?url=https://www.thedp.com/section/news.json').then(resp => {
      const { data } = resp
      setNewsCenterpiece(data.articles.slice(0, 1))
      setNewsArticles(data.articles.slice(1, 4))
    })
    axios.get('/api/fetch?url=https://www.thedp.com/section/opinion.json').then(resp => {
      const { data } = resp
      setOpinionCenterpiece(data.articles.slice(0, 2))
      setOpinionArticles(data.articles.slice(2, 4))
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

      <NavBar />

      <Background>
        <CoverImg src="/img/Covering-COVID.png" className="img-fluid" />
      </Background>

      <SectionDiv className="container">
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
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container">
        <div className="row">
          <div className="col-md">
            <Title> News </Title>
          </div>
          <div className="col-md">
          </div>
        </div>
        <div className="row">
          <div className="col-md">
          {newsCenterpiece && <Article article={newsCenterpiece[0]} />}
          </div>
          <div className="col-md">
          {newsArticles && newsArticles.map(article => <SideArticle article={article} />)}
          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container">
        <div className="row">
          <div className="col-md">
            <Title> Timeline </Title>
          </div>
          <div className="col-md">

          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container">
        <div className="row">
          <div className="col-md">
            <Title> Opinion </Title>
          </div>
          <div className="col-md">

          </div>
          <div className="col-md">

          </div>
        </div>
        <div className="row">
          <div className="col-md">
            {opinionCenterpiece && <Article article={opinionCenterpiece[0]} />}
          </div>
          <div className="col-md">
            {opinionCenterpiece && <Article article={opinionCenterpiece[1]} />}
          </div>
          <div className="col-md">
            {opinionArticles && opinionArticles.map(article => <SideArticle article={article} />)}
          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container">
        <div style={{ textAlign: 'center', fontFamily: 'Libre Franklin, sans-serif' }}>
          For updates on music, things to do, read,
          <br/>
          and watch, check out <a href="https://www.34st.com/"  target="_blank" style={{ color: '#45BFBF' }}>34th Street</a>
        </div>
        
      </SectionDiv>
      
      <Footer> Made with 😷 by The Daily Pennsylvanian © 2020. All rights reserved. </Footer>

    </div>
  )
}

export default Home
