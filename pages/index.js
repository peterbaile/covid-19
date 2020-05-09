import React, { useEffect, useState } from 'react'
import axios from 'axios'
import s from 'styled-components'
import Skeleton from 'react-loading-skeleton'

import Article from '../components/Article'
import LiveUpdate from '../components/LiveUpdate'
import NavBar from '../components/Nav'
import NewsLetter from '../components/NewsLetter'
import SideArticle from '../components/SideArticle'
import Header from '../components/Header'
import Loading from '../components/Loading'

import { Title } from '../components/shared'

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

const SectionDiv = s.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
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

const Home = ({ latestStories }) => {
  const [liveUpdates, setLiveUpdates] = useState(null)
  const [newsCenterpiece, setNewsCenterpiece] = useState(null)
  const [newsArticles, setNewsArticles] = useState(null)
  const [opinionCenterpiece, setOpinionCenterpiece] = useState(null)
  const [opinionArticles, setOpinionArticles] = useState(null)
  const [multimediaArticles, setMultimediaArticles] = useState(null)
  const [lvLoading, setLVLoading] = useState(true)
  const [newsLoading, setNewsLoading] = useState(true)
  const [mmloading, setMMLoading] = useState(true)
  

  useEffect(async () => {
    await axios.get('/api/live-updates').then(resp => {
      const { data } = resp
      setLiveUpdates(data)
      setLVLoading(false)
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/news-covid.json').then(resp => {
      const { data } = resp
      setNewsCenterpiece(data.articles.slice(0, 1))
      setNewsLoading(false)
      setNewsArticles(data.articles.slice(1, 4))
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/opinion.json').then(resp => {
      const { data } = resp
      setOpinionCenterpiece(data.articles.slice(0, 2))
      setOpinionArticles(data.articles.slice(2, 4))
    })

    await axios.get('/api/fetch?url=https://www.thedp.com/section/multimedia.json').then(resp => {
      const { data } = resp
      setMultimediaArticles(data.articles.slice(0, 3))
      setMMLoading(false)
    })
  }, [])

  return (
    <div>
      <Header />

      <NavBar />

      <Background>
        <CoverImg src="/img/Covering-COVID.png" className="img-fluid" />
      </Background>

      <SectionDiv className="container" id="latest">
        <div className="row">
          <div className="col-md">
            <Title> Latest Stories </Title>
            {latestStories && latestStories.map(article => <Article article={article} />)}
          </div>
          <div className="col-md">
            <Title> Live Updates </Title>
            <LiveUpdate liveUpdates={liveUpdates} loading={lvLoading} />
          </div>
        </div>
      </SectionDiv>

      <NewsLetter />

      <Lines className="container" />

      <SectionDiv className="container" id="news">
        <div className="row">
          <div className="col-md">
            <Title> News </Title>
          </div>
          <div className="col-md">
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <Loading loading={newsLoading} />
            {newsCenterpiece && <Article article={newsCenterpiece[0]} />}
          </div>
          <div className="col-md">
            {newsArticles && newsArticles.map(article => <SideArticle article={article} />)}
          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container" id="timeline">
        <div className="row">
          <div className="col-md">
            <Title> Timeline </Title>
          </div>
          <div className="col-md">
          </div>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container" id="opinion">
        <div className="row">
          <div className="col-md">
            <Title> Opinion </Title>
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

      <SectionDiv className="container" id="34st">
        <div style={{ textAlign: 'center', fontFamily: 'Libre Franklin, sans-serif', fontWeight: 900 }}>
          For updates on music, things to do, read,
          <br/>
          and watch, check out <a href="https://www.34st.com/"  target="_blank" style={{ color: '#45BFBF' }}>34th Street</a>
        </div>
      </SectionDiv>

      <Lines className="container" />

      <SectionDiv className="container" id="multimedia">
        <Title> Multimedia </Title>
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
    </div>
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
