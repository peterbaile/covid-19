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

const SideArticle = ({ article, multimedia }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const now = moment().subtract(16, 'hours')
  const { attachment_uuid, extension } = dominantMedia

  if (!article) return null

  if (multimedia) {
    return (
      <StyledLink href={`https://www.thedp.com/article/${slug}`} target="_blank">
        <MultimediaArticleWrapper>
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} style={{ opacity: 0.7 }}/>
          <div style={{ position: 'absolute', top: '30%', padding: '0 2rem' }}>
            <TagText color='#FFFFFF' weightLight> PHOTO ESSAY </TagText>
            <HeadlineText color='#FFFFFF' sideArticle> {parseMultimediaString(headline)} </HeadlineText>
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
      <ArticleWrapper>
        <div className = "row">
          <div className="col-md">
            {tag && <TagText> {tag} </TagText>}
            <HeadlineText sideArticle> {title || headline} </HeadlineText>
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