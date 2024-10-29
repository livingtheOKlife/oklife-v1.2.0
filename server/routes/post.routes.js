import express from 'express'
const router = express.Router()

import upload from '../middleware/upload.middleware.js'

import {
  createPost,
  createPostWithImages,
  updatePost,
  getPosts,
  getUserPosts,
  deletePost,
  likePost,
  dislikePost,
} from '../controllers/post.controllers.js'

router.post('/create', createPost)
router.post('/create/:userId', upload.array('images', 5), createPostWithImages)
router.put('/update/:postId', updatePost)
router.get('/all/:userId', getPosts)
router.get('/user/:userId', getUserPosts)
router.delete('/delete/:postId', deletePost)
router.post('/like/:postId', likePost)
router.post('/dislike/:postId', dislikePost)

export default router
