import Skeleton from 'react-loading-skeleton'
import s from 'styled-components'

import { formatTimestamp, getDuration } from '../utils'
import { ROBOTO_BOLD, LIBRE_BOLD } from '../utils/font'
import { Title, StyledLink } from '../components/shared'

const UpdateWrapper = s.div`
  margin-top: 1rem;
  background: #F5F5F5;
  padding: 2rem;
  margin-bottom: 2rem;
`

const TimestampText = s.div`
  margin-bottom: 0.5rem;
  color: #D12D4A;
  ${ROBOTO_BOLD}
  font-size: 80%;
`

const LiveUpdateTitle = s.h4`
  ${LIBRE_BOLD}
  color: #464242;

  transition: 0.3s;

  :hover {
    color: #B5B4B4;
    transition: 0.3s;
  }
`

const LiveUpdateText = s.p`
  margin-top: 1rem;
  color: ${({ color = '#707070' }) => color};
  font-family: 'Georgia', serif;
  font-size: 80%;

  a {
    color: #D12D4A;
  }
`

const DurationText = s.text`
  color: #D12D4A;
  font-size: 40%;
  vertical-align: middle;
  margin-left: 0.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    display: block;
    margin-left: 0;
  }
`

const LiveUpdate = ({ liveUpdates, loading }) => {
  let durationText = ''

  if (liveUpdates) {
    const { timestamp } = liveUpdates[0]
    if (timestamp) durationText = `Last updated ${getDuration(timestamp, 'h:m a MMM D')}`
  }

  return (
    <>
      <Title> Live Updates <DurationText> {durationText} </DurationText></Title>
      {loading && (
        <>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Skeleton count={5}/>
          </div>
          <Skeleton count={5}/>
        </>
      )}
      {liveUpdates && liveUpdates.map(({ title, content, timestamp }) => (
        <UpdateWrapper>
          {timestamp && <TimestampText> {formatTimestamp(timestamp)} </TimestampText>}
          <StyledLink
            href={`https://www.thedp.com/article/2020/03/penn-coronavirus-live-updates#${title}`}
            target="_blank"
          >
            <LiveUpdateTitle> {title} </LiveUpdateTitle>
          </StyledLink>
          <LiveUpdateText dangerouslySetInnerHTML={{ __html: content }} />
        </UpdateWrapper>
      ))}
    </>
  )
}

export default LiveUpdate