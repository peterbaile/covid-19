import Skeleton from 'react-loading-skeleton'

const Loading = ({ loading }) => {
  if (!loading) return <React.Fragment />

  return (
    <>
      <div style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
        <Skeleton height={200} />
      </div>
      <Skeleton count={5}/>
    </>
  )
}

export default Loading