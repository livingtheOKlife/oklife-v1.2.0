import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import './index.css'

import App from './App.jsx'

import { AlertProvider } from './context/alert/AlertContext'
import { ModalProvider } from './context/modal/ModalContext.jsx'

import HomePage from './pages/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomePage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AlertProvider>
      <ModalProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </ModalProvider>
    </AlertProvider>
  </Provider>
)
