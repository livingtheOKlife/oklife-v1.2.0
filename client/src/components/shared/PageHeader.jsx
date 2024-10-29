import PropTypes from 'prop-types'

import Brand from './Brand'

function PageHeader ({title, subtitle, branded}) {
  return (
    <header className="page-header">
      <h2 className="page-title">{title}{branded && <Brand />}</h2>
      <span className="page-subtitle">{subtitle}</span>
    </header>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  branded: PropTypes.bool.isRequired
}

export default PageHeader