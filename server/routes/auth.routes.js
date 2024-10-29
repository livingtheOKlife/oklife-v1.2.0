import express from 'express'

const router = express.Router()

import {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
} from '../controllers/auth.controllers.js'

router.post('/register', register)
router.post('/verify-email', verifyEmail)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/check-auth', checkAuth)

export default router
