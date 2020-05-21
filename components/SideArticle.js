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

const SideArticle = ({ article, multimedia, fontSize, topMargin }) => {
  const { abstract, published_at, headline, dominantMedia, slug } = article
  const now = moment().subtract(16, 'hours')
  const { attachment_uuid, extension } = dominantMedia

  if (!article) return null

  if (multimedia) {
    return (
      <StyledLink href={`https://www.thedp.com/article/${slug}`} target="_blank">
        <MultimediaArticleWrapper>
          <img className="img-fluid" src={IMAGE_URL(attachment_uuid, extension)} />
          <div style={{ position: 'absolute', top: '30%', padding: '0 2rem', backgroundColor: 'rgb(128, 128, 128, 0.5)' }}>
            <TagText color='#FFFFFF' weightLight> PHOTO ESSAY </TagText>
            <HeadlineText color='#FFFFFF' sideArticle> {parseMultimediaString(headline)} </HeadlineText>
            <AbstractText dangerouslySetInnerHTML={{ __html: abstract }} color='#FFFFFF' multimedia/>
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
          <div className="col-md mb-3">
            {tag && <TagText fontSize={fontSize}> {tag} </TagText>}
            <HeadlineText sideArticle topMargin={topMargin}> {title || headline} </HeadlineText>
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