import PropTypes from 'prop-types'

function Brand ({size}) {
  return (
    <span className={`brand ${size}`}><em>OK</em>life</span>
  )
}

Brand.propTypes = {
  size: PropTypes.string
}

export default Brand