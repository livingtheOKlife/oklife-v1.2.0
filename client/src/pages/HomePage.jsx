import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

import PageHeader from '../components/shared/PageHeader'
import Brand from '../components/shared/Brand'

function HomePage () {
  return (
    <MainContainer className='home-page' wrapper={true} branded={false}>
      <PageHeader title='Welcome!' subtitle='to the...' branded={false} />
      <Brand size='xl' />
      <Link to='/login' className='nav-link'>Sign in to continue</Link>
    </MainContainer>
  )
}

export default HomePage