import asyncHandler from 'express-async-handler'

import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js'

import generateFileUrl from '../utils/generateFileUrl.js'

const createPost = asyncHandler(async (req, res) => {
  const { userId, caption } = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const newPost = new Post({
      user: userId,
      caption,
    })
    await newPost.save()
    user.posts.push(newPost._id)
    await user.save()
    res
      .status(201)
      .json({ message: 'Post created successfully!', post: newPost })
  } catch (error) {
    throw new Error(error)
  }
})

const createPostWithImages = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { caption } = req.body
  const files = req.files
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const imageUrls = files.map((file) => generateFileUrl(file.filename))
    const newPost = new Post({
      user: userId,
      caption,
      images: imageUrls,
    })
    await newPost.save()
    user.posts.push(newPost._id)
    await user.save()
    res
      .status(201)
      .json({ message: 'Post created successfully!', post: newPost })
  } catch (error) {
    throw new Error(error)
  }
})

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const { caption } = req.body
  try {
    const postToUpdate = await Post.findById(postId)
    if (!postToUpdate) {
      res.status(404)
      throw new Error('Post not found!')
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption },
      { new: true }
    )
    await postToUpdate.save()
    res
      .status(200)
      .json({ message: 'Post updated successfully!', post: updatedPost })
  } catch (error) {
    throw new Error(error)
  }
})

const getPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const blockedUserIds = user.blockedList.map((id) => id.toString())
    const allPosts = await Post.find({
      user: { $nin: blockedUserIds },
    }).populate('user', 'username fullName profilePicture')
    res.status(200).json({ posts: allPosts })
  } catch (error) {
    throw new Error(error)
  }
})

const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const userPosts = await Post.find({ user: userId })
    res.status(200).json({ posts: userPosts })
  } catch (error) {
    throw new Error(error)
  }
})

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  try {
    const postToDelete = await Post.findById(postId)
    if (!postToDelete) {
      res.status(404)
      throw new Error('Post not found!')
    }
    const user = await User.findById(postToDelete.user)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    user.posts = user.posts.filter(
      (postId) => postId.toString() !== postToDelete._id.toString()
    )
    await user.save()
    await postToDelete.deleteOne()
    await Comment.deleteMany({ post: postId })
    res.status(200).json({ message: 'Post deleted successfully!' })
  } catch (error) {
    throw new Error(error)
  }
})

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const { userId } = req.body
  try {
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404)
      throw new Error('Post not found!')
    }
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    if (post.likes.includes(userId)) {
      res.status(404)
      throw new Error('You have already liked this post!')
    }
    post.likes.push(userId)
    await post.save()
    res.status(200).json({ message: 'Post liked successfully!', post })
  } catch (error) {
    throw new Error(error)
  }
})

const dislikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params
  const { userId } = req.body
  try {
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404)
      throw new Error('Post not found!')
    }
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    if (!post.likes.includes(userId)) {
      res.status(404)
      throw new Error('You have not liked the post!')
    }
    post.likes = post.likes.filter((id) => id.toString() !== userId)
    await post.save()
    res.status(200).json({ message: 'Post disliked successfully!', post })
  } catch (error) {
    throw new Error(error)
  }
})

export {
  createPost,
  createPostWithImages,
  updatePost,
  getPosts,
  getUserPosts,
  deletePost,
  likePost,
  dislikePost,
}
