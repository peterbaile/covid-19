import s from 'styled-components'

import { STREET_IMAGE_URL, parseAuthors } from '../utils'
import { StyledLink } from './shared'

const HeadLineText = s.p`
  margin-top: 0.5rem;
  color: #283033;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 600;
`

const AuthorText = s.p`
  margin-top: 0.5rem;
  font-family: 'Roboto', sans-serif;
  color: #B5B4B4;
`

const Wrapper = s.div`
  @media (min-width: 768px) {
    margin-top: 20%;
  }
`

const StreetArticle = ({ article }) => {
  const { authors, headline, dominantMedia, slug } = article
  const { attachment_uuid, extension } = dominantMedia

  return (
    <StyledLink href={`https://www.34st.com/article/${slug}`} target="_blank">
      <Wrapper>
        <img className="img-fluid" src={STREET_IMAGE_URL(attachment_uuid, extension)} />
        <HeadLineText> {headline} </HeadLineText>
        <AuthorText> {`By ${parseAuthors(authors)}`} </AuthorText>
      </Wrapper>
    </StyledLink>
  )
}

export default StreetArticle