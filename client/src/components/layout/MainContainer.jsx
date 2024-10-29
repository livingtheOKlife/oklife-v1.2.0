import PropTypes from 'prop-types'

function MainContainer ({className, wrapper, children}) {
  return (
    <main id='main-container' className={className}>
      {
        wrapper ? <div className="main-wrapper">{children}</div>
        : <>{children}</>
      }
    </main>
  )
}

MainContainer.propTypes = {
  className: PropTypes.string.isRequired,
  wrapper: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default MainContainer