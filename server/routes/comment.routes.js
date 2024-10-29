import express from 'express'
const router = express.Router()

import {
  createComment,
  createCommentReply,
  updateComment,
  updateCommentReply,
  getCommentsByPost,
  deleteComment,
  deleteCommentReply,
  likeComment,
  dislikeComment,
  likeCommentReply,
  dislikeCommentReply,
} from '../controllers/comment.controllers.js'

router.post('/create', createComment)
router.post('/create/reply/:commentId', createCommentReply)
router.put('/update/:commentId', updateComment)
router.put('/update/:commentId/replies/:replyId', updateCommentReply)
router.get('/post/:postId', getCommentsByPost)
router.delete('/delete/:commentId', deleteComment)
router.delete('/delete/:commentId/replies/:replyId', deleteCommentReply)
router.post('/like/:commentId/', likeComment)
router.post('/dislike/:commentId/', dislikeComment)
router.post('/:commentId/replies/like/:replyId', likeCommentReply)
router.post('/:commentId/replies/dislike/:replyId', dislikeCommentReply)

export default router
