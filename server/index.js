import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'

import { notFound, errorHandler } from './middleware/error.middleware.js'

import connectDB from './config/database.config.js'

import authRoutes from './routes/auth.routes.js'

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.get('/', () => console.log('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  connectDB(), console.log(`Server started on port ${port}`)
})
