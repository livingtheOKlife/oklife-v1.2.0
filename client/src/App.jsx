import { Outlet } from 'react-router-dom'

import FooterContainer from './components/layout/FooterContainer'
import HeaderContainer from './components/layout/HeaderContainer'

import Alert from './components/Alert'
import Modal from './components/Modal'

function App () {
  return (
    <div id="App">
      <h1>livingtheOKlife</h1>
      <HeaderContainer />
      <Outlet />
      <FooterContainer />
      <Alert />
      <Modal />
    </div>
  )
}

export default App
