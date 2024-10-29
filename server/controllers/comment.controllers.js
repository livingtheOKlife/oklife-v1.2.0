import asyncHandler from 'express-async-handler'

import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js'

import populateUserDetails from '../utils/populateUserDetails.js'

const createComment = asyncHandler(async (req, res) => {
  const { postId, userId, text } = req.body
  try {
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    }
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const newComment = new Comment({
      user: userId,
      post: postId,
      text,
    })
    await newComment.save()
    post.comments.push(newComment._id)
    await post.save()
    res
      .status(201)
      .json({ message: 'Comment added to the post', comment: newComment })
  } catch (error) {
    throw new Error(error)
  }
})

const createCommentReply = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { text, userId } = req.body
  try {
    const parentComment = await Comment.findById(commentId)
    if (!parentComment) {
      res.status(404)
      throw new Error('Parent comment not found!')
    }
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const reply = {
      text,
      user: userId,
    }
    parentComment.replies.push(reply)
    await parentComment.save()
    res.status(201).json({ message: 'Reply created successfully!', reply })
  } catch (error) {
    throw new Error(error)
  }
})

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { text } = req.body
  try {
    const commentToUpdate = await Comment.findById(commentId)
    if (!commentToUpdate) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    )
    res
      .status(200)
      .json({ message: 'Comment updated successfully!', updatedComment })
  } catch (error) {
    throw new Error(error)
  }
})

const updateCommentReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params
  const { text, userId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    const replyIndex = comment.replies.findIndex(
      (reply) => reply._id.toString() === replyId
    )
    if (replyIndex === -1) {
      res.status(404)
      throw new Error('Reply not found!')
    }
    if (comment.replies[replyIndex].user.toString() !== userId) {
      res.status(500)
      throw new Error('You can only update your comments')
    }
    comment.replies[replyIndex].text = text
    await comment.save()
    res.status(200).json({ message: 'Reply updated successfully!', comment })
  } catch (error) {
    throw new Error(error)
  }
})

const getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  try {
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404)
      throw new Error('Post not found!')
    }
    let comments = await Comment.find({ post: postId })
    await populateUserDetails(comments)
    res.status(200).json({ comments })
  } catch (error) {
    throw new Error(error)
  }
})

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    await Post.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    )
    await comment.deleteOne()
    res.status(200).json({ message: 'Comment has been deleted!' })
  } catch (error) {
    throw new Error(error)
  }
})

const deleteCommentReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    comment.replies = comment.replies.filter((id) => {
      id.toString() !== replyId
    })
    await comment.save()
    res.status(200).json({ message: 'Reply comment deleted successfully!' })
  } catch (error) {
    throw new Error(error)
  }
})

const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { userId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    if (comment.likes.includes(userId)) {
      res.status(500)
      throw new Error('You have already liked this comment')
    }
    comment.likes.push(userId)
    await comment.save()
    res.status(200).json({ message: 'Comment liked successfully!', comment })
  } catch (error) {
    throw new Error(error)
  }
})

const dislikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params
  const { userId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    if (!comment.likes.includes(userId)) {
      res.status(500)
      throw new Error('You have have not liked this comment')
    }
    comment.likes = comment.likes.filter((id) => id.toString() !== userId)
    await comment.save()
    res.status(200).json({ message: 'Comment disliked successfully!', comment })
  } catch (error) {
    throw new Error(error)
  }
})

const likeCommentReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params
  const { userId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    const replyComment = comment.replies.id(replyId)
    if (!replyComment) {
      res.status(404)
      throw new Error('Reply comment not found!')
    }
    if (replyComment.likes.includes(userId)) {
      res.status(500)
      throw new Error('You already liked the reply comment!')
    }
    replyComment.likes.push(userId)
    await comment.save()
    res
      .status(200)
      .json({ message: 'Reply comment liked successfully!', comment })
  } catch (error) {
    throw new Error(error)
  }
})

const dislikeCommentReply = asyncHandler(async (req, res) => {
  const { commentId, replyId } = req.params
  const { userId } = req.body
  try {
    const comment = await Comment.findById(commentId)
    if (!comment) {
      res.status(404)
      throw new Error('Comment not found!')
    }
    const replyComment = comment.replies.id(replyId)
    if (!replyComment) {
      res.status(404)
      throw new Error('Reply comment not found!')
    }
    if (!replyComment.likes.includes(userId)) {
      res.status(500)
      throw new Error('You have not liked the reply comment!')
    }
    replyComment.likes = replyComment.likes.filter(
      (id) => id.toString() !== userId
    )
    await comment.save()
    res
      .status(200)
      .json({ message: 'Reply comment disliked successfully!', comment })
  } catch (error) {
    throw new Error(error)
  }
})

export {
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
}
