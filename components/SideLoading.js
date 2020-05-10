import Skeleton from 'react-loading-skeleton'

const SideLoading = ({ loading, count }) => {
  if (!loading) return <React.Fragment />

  return [...Array(count).keys()].map(() => (
    <div className="row" style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
        <div className="col-md">
          <Skeleton count={5}/>
        </div>
        <div className="col-md">
          <Skeleton height={200} />
        </div>
      </div>
  ))
}

export default SideLoading