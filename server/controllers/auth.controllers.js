import asyncHandler from 'express-async-handler'
import crypto from 'crypto'

import User from '../models/user.model.js'

import generateToken from '../utils/generateToken.js'
import sendVerificationEmail from '../utils/sendVerificationEmail.js'
import sendWelcomeEmail from '../utils/sendWelcomeEmail.js'
import sendForgotPasswordEmail from '../utils/sendForgotPasswordEmail.js'
import sendPasswordResetEmail from '../utils/sendPasswordResetEmail.js'

const register = asyncHandler(async (req, res) => {
  const { username, email, password, fullName } = req.body
  try {
    if (!username || !email || !password || !fullName) {
      throw new Error('All fields are required')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({ success: false, message: 'User already exists' })
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString()
    const user = await User.create({
      username,
      email,
      password,
      fullName,
      verificationToken,
      verificationExpiry: Date.now() + 24 * 60 * 60 * 1000,
    })
    if (user) {
      generateToken(res, user._id)
      await sendVerificationEmail(user.email, verificationToken)
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          ...user._doc,
          password: undefined,
        },
      })
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body
  try {
    const user = await User.findOne({
      verificationToken: token,
    })
    if (!user) {
      res.status(404).json({ sucess: false, message: 'User not found' })
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationExpiry = undefined
    await user.save()
    await sendWelcomeEmail(user.email, user.fullName)
    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  console.log(user)
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    })
  } else {
    res
      .status(400)
      .json({ success: false, message: 'Invalid email or password' })
  }
})

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ success: true, message: 'User logged out' })
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({ sucess: false, message: 'User not found' })
    }
    const resetToken = crypto.randomBytes(20).toString('hex')
    const resetExpiry = Date.now() + 1 * 60 * 60 * 1000
    user.resetPasswordToken = resetToken
    user.resetPasswordExpiry = resetExpiry
    await user.save()
    await sendForgotPasswordEmail(
      user.email,
      `${process.env.BASE_URL}/api/auth/reset-password/${resetToken}`
    )
    res.status(200).json({ success: true, message: 'Password reset link sent' })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    })
    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid reset token' })
    }
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()
    sendPasswordResetEmail(user.email)
    res
      .status(200)
      .json({ success: true, message: 'Password reset successfully' })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

const checkAuth = asyncHandler(async (req, res) => {
  const { userId } = req.userId
  try {
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' })
    }
    res.status(200).json({ success: true, user })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

export {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
}
