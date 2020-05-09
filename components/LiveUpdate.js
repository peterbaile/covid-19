import Skeleton from 'react-loading-skeleton'

import { UpdateWrapper, LiveUpdateTitle, LiveUpdateText } from './shared'


const LiveUpdate = ({ liveUpdates, loading }) => {
  return (
    <>
      {loading && (
        <>
          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Skeleton count={5}/>
          </div>
          <Skeleton count={5}/>
        </>
      )}
      {liveUpdates && liveUpdates.map(({ title, content }) => (
        <UpdateWrapper>
          <LiveUpdateTitle> {title} </LiveUpdateTitle>
          <LiveUpdateText> {content} </LiveUpdateText>
        </UpdateWrapper>
      ))}
    </>
  )
}

export default LiveUpdate