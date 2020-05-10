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

const StreetCenter = ({ article }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const {
    attachment_uuid,
    created_at,
    extension,
    content: imageContent
  } = dominantMedia

  return (
    <StyledLink href={`https://www.34st.com/article/${slug}`} target="_blank">
      <Wrapper>
        <div className="row" style={{ width: '70%', margin: 'auto' }}>
          <div className="col-md">
            {headline}
          </div>
          <div className="col-md">
            <img className="img-fluid" src={STREET_IMAGE_URL(attachment_uuid, extension)} />
          </div>
        </div>
      </Wrapper>
    </StyledLink>
  )
}

export default StreetCenter