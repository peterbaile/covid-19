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

const Article = ({ article, multimedia }) => {
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
        <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} style={{ height: 'fit-content' }} />
        <div style={{ position: 'absolute', top: '2rem', left: '16px' }}>
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

export default Article