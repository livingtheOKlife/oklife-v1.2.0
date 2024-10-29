import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

import PageHeader from '../components/shared/PageHeader'
import Brand from '../components/shared/Brand'

function PageNotFoundPage () {
  return (
    <MainContainer className='page-not-found' wrapper={true}>
      <PageHeader title='Ooops!' subtitle='Page not found!' branded={false} />
      <Link to='/explore' className='nav-link'>Back to exploring</Link>
      <Brand size='md' />
    </MainContainer>
  )
}

export default PageNotFoundPage