import s from 'styled-components'

import { StyledLink } from './shared'

const Wrapper = s.div`
  color: #707070;
  font-family: 'Playfair Display', serif;
  margin: 2rem 0;
  font-size: 150%;
  font-weight: lighter;
  padding-bottom: 2rem;
  border-bottom: 1px solid #D8D2D2;
`

const BlueMark = s.mark`
  background-color: rgba(69, 191, 191, 0.1);
  color: #707070;
`

const ARTICLE_LINK = "https://www.34st.com/"

const StreetCenter = () => (
  <StyledLink href={ARTICLE_LINK} target="_blank">
    <Wrapper>
      <div className="row" style={{ width: '80%', margin: 'auto' }}>
        <div className="col-md" style={{ alignSelf: 'center' }}>
          <BlueMark>Your definitive source</BlueMark> for music and movie reviews, community spotlights, explanations of the latest baking trends, and other miscellaneous ways to stay sane and productive in quarantine.
        </div>
        <div className="col-md">
          <img className="img-fluid" src="/img/34st.png" />
        </div>
      </div>
    </Wrapper>
  </StyledLink>
)

export default StreetCenter