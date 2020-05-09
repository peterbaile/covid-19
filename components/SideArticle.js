import moment from 'moment'

import {
  StyledLink,
  MultimediaArticleWrapper,
  HeadlineText,
  AbstractText,
  ArticleWrapper,
  TimestampText
} from './shared'

import { IMAGE_URL } from '../utils'

const SideArticle = ({ article, multimedia }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const now = moment().subtract(16, 'hours')
  const {
    attachment_uuid,
    created_at,
    extension,
    content: imageContent
  } = dominantMedia

  if (!article) return null

  if (multimedia) {
    return (
      <StyledLink href={`https://www.thedp.com/article/${slug}`}>
      <MultimediaArticleWrapper>
        <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} height="110%"/>
        <div style={{ position: 'absolute', top: '8px', left: '16px' }}>
          <HeadlineText color='#FFFFFF'> {headline} </HeadlineText>
          <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} color='#FFFFFF' />
        </div>
      </MultimediaArticleWrapper>
      </StyledLink>
    )
  }

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

export default SideArticle