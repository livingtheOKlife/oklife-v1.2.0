import { useContext } from 'react'

import { PiXBold } from 'react-icons/pi'

import ModalContext from '../context/modal/ModalContext'

function Modal () {
  const {modal, dispatch} = useContext(ModalContext)
  return modal !== null &&
    <aside id='modal-zeta'>
      <div className='modal-zeta'>
        <header className='modal-header'>
          <h3>{modal.title}</h3>
          <button className='modal-btn' onClick={() => dispatch({type: 'SET_MODAL_INACTIVE'})}>
            <PiXBold className='modal-btn-icon' />
          </button>
        </header>
        <main className="modal-main"></main>
        <footer className="modal-footer"></footer>
      </div>
    </aside>
}

export default Modal