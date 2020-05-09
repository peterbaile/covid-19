import { UpdateWrapper } from './shared'
import Loading from './Loading'
import Skeleton from 'react-loading-skeleton'

const LiveUpdate = ({ liveUpdates, loading }) => {
  return (
    <>
      {loading && <div style={{ marginTop: '1rem' }}> <Skeleton count={5}/> </div>}
      <UpdateWrapper>
        {/* {loading && <Skeleton count={5}/>} */}
        {liveUpdates && liveUpdates.map(({ title, content }) => (
          <>
          {title}
          {content}
          </>
        ))}
      </UpdateWrapper>
    </>
  )
}

export default LiveUpdate