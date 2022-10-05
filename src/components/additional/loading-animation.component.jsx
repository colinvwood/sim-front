import './loading-animation.styles.css';

const LoadingAnimation = (props) => {

  if (!props.loading) {
    return null;
  }

  return (
    <div>
      <div className="loading-animation"></div>
      <p>Loading...</p>
    </div>
  )
    
}

export default LoadingAnimation;