import s from 'styled-components'

import { STREET_IMAGE_URL, parseAuthors } from '../utils'
import { StyledLink } from './shared'

const HeadLineText = s.div`
  margin-top: 2rem;
  color: #283033;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 600;
`

const AuthorText = s.div`
  margin-top: 0.5rem;
  font-family: 'Roboto', sans-serif;
  color: #B5B4B4;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

const Wrapper = s.div`
  @media (min-width: 768px) {
    margin-top: 20%;
  }
`

const Image = s.img`
  max-height: 130px;

  @media (max-width: 768px) {
    max-height: none;
  }
`

const StreetArticle = ({ article }) => {
  const { authors, headline, dominantMedia, slug } = article
  const { attachment_uuid, extension } = dominantMedia

  return (
    <StyledLink href={`https://www.34st.com/article/${slug}`} target="_blank">
      <Wrapper>
        <div style={{ textAlign: 'center' }}>
          <Image className="img-fluid" src={STREET_IMAGE_URL(attachment_uuid, extension)} />
        </div>
        <HeadLineText> {headline} </HeadLineText>
        <AuthorText> {`By ${parseAuthors(authors)}`} </AuthorText>
      </Wrapper>
    </StyledLink>
  )
}

export default StreetArticle