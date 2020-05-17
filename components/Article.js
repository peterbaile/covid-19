import moment from 'moment'

import {
  StyledLink,
  MultimediaArticleWrapper,
  HeadlineText,
  AbstractText,
  ArticleWrapper,
  TimestampText,
  TagText
} from './shared'

import { IMAGE_URL, extractOpinionHeadline, parseMultimediaString } from '../utils'

const Article = ({ article, multimedia, centerText }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const now = moment().subtract(16, 'hours')
  const { attachment_uuid, extension } = dominantMedia

  if (!article) return null

  if (multimedia) {
    return (
      <StyledLink href={`https://www.thedp.com/article/${slug}`} target="_blank">
        <MultimediaArticleWrapper>
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} style={{ height: 'fit-content' }} />
          <div style={{ position: 'absolute', top: '2rem', left: '16px' }}>
            <TagText color='#FFFFFF' weightLight> PHOTO ESSAY </TagText>
            <HeadlineText color='#FFFFFF'> {parseMultimediaString(headline)} </HeadlineText>
            <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} color='#FFFFFF' />
            <TimestampText color='#FFFFFF'> 
              {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment(published_at).fromNow()} 
            </TimestampText>
          </div>
        </MultimediaArticleWrapper>
      </StyledLink>
    )
  }

  const { tag, title } = extractOpinionHeadline(headline)

  return (
    <StyledLink href={`https://www.thedp.com/article/${slug}`} target="_blank">
      <ArticleWrapper centerText={centerText}>
        <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} />
        {tag && <TagText> {tag} </TagText>}
        <HeadlineText> {title || headline} </HeadlineText>
        <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} />
        <TimestampText> 
          {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment(published_at).fromNow()} 
        </TimestampText>
      </ArticleWrapper>
    </StyledLink>
  )
}

export default Article