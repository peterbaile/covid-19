import s from 'styled-components'

import { STREET_IMAGE_URL } from '../utils'
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

const ARTICLE_LINK = 'https://www.34st.com/article/2020/04/grit-book-angela-duckworth-quarantine-productivity-positive-pyschology-taylor-lorenz-self-care'
const IMAGE_LINK = 'https://snworksceo.imgix.net/dpn-34s/6409cf93-7097-4e35-9ff8-efe3f02bca13.sized-1000x1000.PNG?w=1000'

const StreetCenter = () => (
  <StyledLink href={ARTICLE_LINK} target="_blank">
    <Wrapper>
      <div className="row" style={{ width: '80%', margin: 'auto' }}>
        <div className="col-md" style={{ alignSelf: 'center' }}>
          <BlueMark>Balancing productivity</BlueMark> and grit during quarantine, how Penn students are taking action,
          the album with the perfect score, and your favorite Philly workout classes&#8212;<i>online&#63;</i>
        </div>
        <div className="col-md">
          <img className="img-fluid" src="/img/34st.png" />
        </div>
      </div>
    </Wrapper>
  </StyledLink>
)

export default StreetCenter