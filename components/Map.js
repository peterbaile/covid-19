import React from 'react'
import s from 'styled-components'

import { Title, StyledLink } from '../components/shared'
import { LIBRE_BOLD, ROBOTO_REGULAR } from '../utils/font'

const MapWrapper = s.iframe`
  width: 0;
  min-width: 80% !important;
  border: none;
  display: block;
  margin: 0 auto;
  height: 769px;

  @media (max-width: 768px) {
    height: 550px;
  }
`

const TextWrapper = s.div`
  margin-top: 1rem;
  text-align: center;
`

const HeaderText = s.div`
  font-size: 130%;
  color: #464242;
  ${LIBRE_BOLD}

  :hover {
    color: #B5B4B4;
    transition: 0.3s;
  }
`

const SubText = s.div`
  font-size: 80%;
  color: #B5B4B4;
  ${ROBOTO_REGULAR}
`

const LinkTitle = s(Title)`
  :hover {
    color: #B5B4B4;
    transition: 0.3s;
  }
`

const Map = () => (
  <div className="container" style={{ marginBottom: '1rem' }} id="tracking">
    <div className="row">
      <StyledLink href="https://www.thedp.com/article/2020/05/live-updates-map-latest-news-colleges-opening-coronavirus-national">
        <LinkTitle> Tracking Fall 2020 </LinkTitle>
      </StyledLink>
    </div>
    <TextWrapper>
      <StyledLink href="https://www.thedp.com/article/2020/05/live-updates-map-latest-news-colleges-opening-coronavirus-national">
        <HeaderText> U.S. College 2020 Fall Plans </HeaderText>
      </StyledLink>
      <SubText> All 50 states, including over 250 colleges, are represented in this map. </SubText>
    </TextWrapper>
    <MapWrapper
      aria-label="Map"
      id="datawrapper-chart-zlgcC"
      src="https://datawrapper.dwcdn.net/zlgcC/74/"
      scrolling="no"
      frameborder="0"
    />
  </div>
)

export default Map
