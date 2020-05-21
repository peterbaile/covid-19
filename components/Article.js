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

const Article = ({ article, multimedia, centerText, centerImage, topMargin, tagTextTopMargin }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const now = moment().subtract(16, 'hours')
  const { attachment_uuid, extension } = dominantMedia

  if (!article) return null

  if (multimedia) {
    return (
      <StyledLink href={`https://www.thedp.com/article/${slug}`} target="_blank">
        <MultimediaArticleWrapper>
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} style={{ height: 'fit-content' }} />
          <div style={{ position: 'absolute', top: '2rem', padding: '16px 0 16px 16px', backgroundColor: 'rgb(128, 128, 128, 0.5)' }}>
            <TagText color='#FFFFFF' weightLight> PHOTO ESSAY </TagText>
            <HeadlineText color='#FFFFFF'> {parseMultimediaString(headline)} </HeadlineText>
            <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} color='#FFFFFF' />
            <TimestampText color='#FFFFFF'> 
              {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment.utc(published_at).fromNow()} 
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
        <div style={{ textAlign: centerImage ? 'center' : '' }}>
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} style={{ maxHeight: centerImage ? '200px' : '' }}/>
        </div>
        {tag && <TagText topMargin={tagTextTopMargin}> {tag} </TagText>}
        <HeadlineText topMargin={topMargin}> {title || headline} </HeadlineText>
        <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} />
        <TimestampText> 
          {(moment(published_at).isBefore(now, "minute")) ? moment(published_at).format('MMMM D') : moment.utc(published_at).fromNow()} 
        </TimestampText>
      </ArticleWrapper>
    </StyledLink>
  )
}

export default Article