import React, { useEffect, useState } from 'react'
import axios from 'axios'
import s from 'styled-components'

import Article from '../components/Article'
import LiveUpdate from '../components/LiveUpdate'
import NavBar from '../components/Nav'
import NewsLetter from '../components/NewsLetter'
import SideArticle from '../components/SideArticle'
import Header from '../components/Header'
import Loading from '../components/Loading'
import SideLoading from '../components/SideLoading'
import StreetCenter from '../components/StreetCenter'
import Map from '../components/Map'
import Ad from '../components/Ad'
import Tracker from '../components/Tracker'

import { Title, StyledLink } from '../components/shared'
import StreetArticle from '../components/StreetArticle'
import { initGA, logPageView } from '../utils/analytics'
import { LIBRE_BOLD } from '../utils/font'

const Background = s.div`
  background-image: url('/img/dark-background.png');
  border: 1px solid #707070;
  opacity: 1;
  text-align: center;
`

const CoverImg = s.img`
  padding: 1rem 0;
  max-height: 200px;
`

const SectionDiv = s.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Footer = s.div`
  margin-top: 2rem;
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

const UpdateLinkDiv = s.div`
  ${LIBRE_BOLD}
  font-size: ${({ fontSize = '70%' }) => fontSize};
  color: #FFFFFF;
  width: ${({ width = '60%' }) => width};
  margin: auto;
  margin-top: 2rem;
  padding: 1rem 2rem;
  text-align: center;
`

const Home = ({ latestStories }) => {
  const [liveUpdates, setLiveUpdates] = useState(null)
  const [newsCenterpiece, setNewsCenterpiece] = useState(null)
  const [newsArticles, setNewsArticles] = useState(null)
  const [opinionCenterpiece, setOpinionCenterpiece] = useState(null)
  const [opinionArticles, setOpinionArticles] = useState(null)
  const [streetArticles, setStreetArticles] = useState(null)
  const [sportsCenterpiece, setSportsCenterpiece] = useState(null)
  const [sportsArticles, setSportsArticles] = useState(null)
  const [multimediaArticles, setMultimediaArticles] = useState(null)

  const [lvLoading, setLVLoading] = useState(true)
  const [newsLoading, setNewsLoading] = useState(true)
  const [mmloading, setMMLoading] = useState(true)
  const [opinionLoading, setOpinionLoading] = useState(true)
  const [streetLoading, setStreetLoading] = useState(true)
  const [sportsLoading, setSportsLoading] = useState(true)

  useEffect(async () => {
    initGA()
    logPageView()

    await axios.get('/api/live-updates').then(resp => {
      const { data } = resp
      setLiveUpdates(data)
      setLVLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/news-covid.json').then(resp => {
      const { data } = resp
      setNewsCenterpiece(data.articles.slice(0, 1))
      setNewsArticles(data.articles.slice(1, 4))
      setNewsLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/opinion-covid.json').then(resp => {
      const { data } = resp
      setOpinionCenterpiece(data.articles.slice(0, 2))
      setOpinionArticles(data.articles.slice(2, 5))
      setOpinionLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.34st.com/section/street-covid.json').then(resp => {
      const { data } = resp
      setStreetArticles(data.articles.slice(1, 6))
      setStreetLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/sports-covid.json').then(resp => {
      const { data } = resp
      setSportsCenterpiece(data.articles.slice(0, 2))
      setSportsArticles(data.articles.slice(2, 5))
      setSportsLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/multimedia-covid.json').then(resp => {
      const { data } = resp
      setMultimediaArticles(data.articles.slice(0, 3))
      setMMLoading(false)
    })
  }, [])

  return (
    <>
      <Header />

      <NavBar />

      <Background>
        <CoverImg src="/img/Covering-COVID.png" className="img-fluid" />
      </Background>

      <Tracker />

      <SectionDiv className="container" id="latest">
        <div className="row">
          <div className="col-md">
            <Title> Latest Stories </Title>
            {latestStories && latestStories.map(article => <Article article={article} />)}
          </div>
          <div className="col-md">
            <LiveUpdate liveUpdates={liveUpdates} loading={lvLoading} />
            <StyledLink href="https://www.thedp.com/section/covid" target="_blank">
              <UpdateLinkDiv className="updateLinkDiv">
                For the full list of COVID-19 updates, click here
              </UpdateLinkDiv>
            </StyledLink>
          </div>
        </div>
      </SectionDiv>

      <Map />

      <NewsLetter />

      <Lines className="container" />

      <SectionDiv className="container" id="news">
        <div className="row">
          <Title> News </Title>
        </div>
        <div className="row">
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={newsLoading} />
            {newsCenterpiece && <Article article={newsCenterpiece[0]} centerText={true} topMargin="4rem" />}
          </div>
          <div className="col-md">
            <SideLoading loading={newsLoading} count={3} />
            {newsArticles && newsArticles.map((article, idx) => (
              <div style={{ borderBottom: idx < newsArticles.length - 1 ? '1px solid #D8D2D2' : 'none' }}>
                <SideArticle article={article} />
              </div> 
            ))}
          </div>
        </div>
      </SectionDiv>

      <Ad />

      <Lines className="container" />

      <SectionDiv className="container" id="opinion">
        <div className="row">
          <Title> Opinion </Title>
        </div>
        <div className="row">
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={opinionLoading} />
            {opinionCenterpiece && <Article article={opinionCenterpiece[0]} centerImage tagTextTopMargin="2rem" topMargin="0.2rem" />}
          </div>
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={opinionLoading} />
            {opinionCenterpiece && <Article article={opinionCenterpiece[1]} centerImage tagTextTopMargin="2rem" topMargin="0.2rem" />}
          </div>
          <div className="col-md">
            <SideLoading loading={opinionLoading} count={2} />
            {opinionArticles && opinionArticles.map((article, idx) => (
              <div style={{ borderBottom: idx < opinionArticles.length - 1 ? '1px solid #D8D2D2' : 'none' }}>
                <SideArticle article={article} fontSize="85%" topMargin="0.2rem" />
              </div> 
            ))}
          </div>
        </div>
        <StyledLink href="https://www.thedp.com/page/opinion-submissions" target="_blank">
          <UpdateLinkDiv fontSize='100%' width='300px' className="updateLinkDiv">
            Submit a guest column
          </UpdateLinkDiv>
        </StyledLink>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container" id="34st">
        <div style={{ textAlign: 'center', fontFamily: 'Libre Franklin, sans-serif', fontWeight: 900, fontSize: '125%' }}>
          For artsy, cultured updates on entertainment
          <br/>
          and student life, check out <a href="https://www.34st.com/"  target="_blank" style={{ color: '#45BFBF' }}>34th Street</a>
        </div>
        <StreetCenter />
        <div className="row">
          {streetArticles && streetArticles.map((article, idx) => (
            <div
              className="col-md mb-3"
              style={{ borderRight: idx < streetArticles.length - 1 ? '1px solid #D8D2D2' : 'none' }}
            >
              <StreetArticle article={article} />
            </div>
          ))}
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container" id="sports">
        <div className="row">
          <Title> Sports </Title>
        </div>
        <div className="row">
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={sportsLoading} />
            {sportsCenterpiece && <Article article={sportsCenterpiece[0]} centerImage tagTextTopMargin="2rem" topMargin="2rem" />}
          </div>
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={sportsLoading} />
            {sportsCenterpiece && <Article article={sportsCenterpiece[1]} centerImage tagTextTopMargin="2rem" topMargin="2rem" />}
          </div>
          <div className="col-md">
            <SideLoading loading={sportsLoading} count={2} />
            {sportsArticles && sportsArticles.map((article, idx) => (
              <div style={{ borderBottom: idx < sportsArticles.length - 1 ? '1px solid #D8D2D2' : 'none' }}>
                <SideArticle article={article} fontSize="85%" topMargin="0.2rem" />
              </div> 
            ))}
          </div>
        </div>
      </SectionDiv>

      <Ad />

      <Lines className="container" />

      <SectionDiv className="container" id="multimedia">
        <div className="row">
          <Title> Multimedia </Title>
        </div>
        <div className="row">
          <div className="col-md" style={{ borderRight: '1px solid #D8D2D2' }}>
            <Loading loading={mmloading} />
            {multimediaArticles && <Article article={multimediaArticles[0]} multimedia={true} />}
          </div>
          <div className="col-md">
            <div style={{ borderBottom: '1px solid #D8D2D2' }}>
              <Loading loading={mmloading} />
              {multimediaArticles && <SideArticle article={multimediaArticles[1]} multimedia={true} />}
            </div>
            <div>
              <Loading loading={mmloading} />
              {multimediaArticles && <SideArticle article={multimediaArticles[2]} multimedia={true} />}
            </div>
          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />
      
      <Footer> Made with 😷 by The Daily Pennsylvanian © 2020. All rights reserved. </Footer>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const BASE = req ? `${req.protocol}://${req.get('Host')}` : '';

  // fetch latest stories
  let resp = await axios.get(`${BASE}/api/fetch?url=https://www.thedp.com/section/latest-covid.json`)
  let { data: { articles } } = resp
  const latestStories = articles.slice(0, 2)

  // decide not to use getserversideprops for the following because
  // this will take too long to load the page

  // // fetch news articles
  // resp = await axios.get(`${BASE}/api/fetch?url=https://www.thedp.com/section/news-covid.json`)
  // articles = resp.data.articles
  // const newsCenterpiece = articles.slice(0, 1)
  // const newsArticles = articles.slice(1, 4)

  // // fetch opinion articles
  // resp = await axios.get(`${BASE}/api/fetch?url=https://www.thedp.com/section/opinion.json`)
  // articles = resp.data.articles
  // const opinionCenterpiece = articles.slice(0, 2)
  // const opinionArticles = articles.slice(2, 4)

  // // fetch multimedia articles
  // resp = await axios.get(`${BASE}/api/fetch?url=https://www.thedp.com/section/multimedia.json`)
  // articles = resp.data.articles
  // const multimediaArticles = articles.slice(0, 3)

  return {
    props: {
      latestStories,
      // newsCenterpiece,
      // newsArticles,
      // opinionArticles,
      // opinionCenterpiece,
      // multimediaArticles
    }
  }
}

export default Home
