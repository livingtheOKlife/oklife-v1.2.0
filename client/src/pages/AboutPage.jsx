import { Link } from 'react-router-dom'

import MainContainer from '../components/layout/MainContainer'

import PageHeader from '../components/shared/PageHeader'

function AboutPage () {
  return (
    <MainContainer className='about-page' wrapper={true}>
      <PageHeader title='About the ' branded={true} />
      <main className="page-main">
        <p>Do you know why the number 42 is the meaning of life?</p>
        <p>In the ASCII character language, 42 is the character value for an Astrerix.</p>
        <p>And in programming, we use an Asterix to refer to anything and everything we want it to be...</p>
      </main>
      <Link to='/' className='nav-link'>Back to exploring</Link>
    </MainContainer>
  )
}

export default AboutPage