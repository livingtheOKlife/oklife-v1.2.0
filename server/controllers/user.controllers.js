import asyncHandler from 'express-async-handler'

import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js'

import generateFileUrl from '../utils/generateFileUrl.js'

const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404)
      throw new Error('User not found')
    }
    const { password, ...data } = user
    res.status(200).json(data._doc)
  } catch (error) {
    throw new Error(error)
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const updateData = req.body
  try {
    const userToUpdate = await User.findById(userId)
    if (!userToUpdate) {
      res.status(404)
      throw new Error('User not found!')
    }
    Object.assign(userToUpdate, updateData)
    await userToUpdate.save()
    res
      .status(200)
      .json({ message: 'User updated successfully!', user: userToUpdate })
  } catch (error) {
    throw new Error(error)
  }
})

const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You can not follow yourself')
    }
    const userToFollow = await User.findById(userId)
    const loggedInUser = await User.findById(_id)
    if (!userToFollow || !loggedInUser) {
      console.log(userToFollow)
      console.log(loggedInUser)
      res.status(404)
      throw new Error('User not found!')
    }
    if (loggedInUser.following.includes(userId)) {
      res.status(400)
      throw new Error('Already following this user!')
    }
    loggedInUser.following.push(userId)
    userToFollow.followers.push(_id)
    await loggedInUser.save()
    await userToFollow.save()
    res
      .status(200)
      .json({ message: `You successfully followed ${userToFollow.username}!` })
  } catch (error) {
    throw new Error(error)
  }
})

const unfollowUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You can not unfollow yourself')
    }
    const userToUnfollow = await User.findById(userId)
    const loggedInUser = await User.findById(_id)
    if (!userToUnfollow || !loggedInUser) {
      res.status(404)
      throw new Error('User not found!')
    }
    if (!loggedInUser.following.includes(userId)) {
      res.status(400)
      throw new Error('Not following this user')
    }
    loggedInUser.following = loggedInUser.following.filter(
      (id) => id.toString() !== userId
    )
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== _id
    )
    await loggedInUser.save()
    await userToUnfollow.save()
    res.status(200).json({
      message: `You successfully unfollowed ${userToUnfollow.username}!`,
    })
  } catch (error) {
    throw new Error(error)
  }
})

const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You can not block yourself')
    }
    const userToBlock = await User.findById(userId)
    const loggedInUser = await User.findById(_id)
    if (!userToBlock || !loggedInUser) {
      res.status(404)
      throw new Error('User not found!')
    }
    if (loggedInUser.blockedList.includes(userId)) {
      res.status(400)
      throw new Error('This user is already blocked!')
    }
    loggedInUser.blockedList.push(userId)
    loggedInUser.following = loggedInUser.following.filter(
      (id) => id.toString() !== userId
    )
    userToBlock.followers = userToBlock.followers.filter(
      (id) => id.toString() !== _id
    )
    await loggedInUser.save()
    await userToBlock.save()
    res.status(200).json({ message: 'Successfully blocked user!' })
  } catch (error) {
    throw new Error(error)
  }
})

const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { _id } = req.body
  try {
    if (userId === _id) {
      res.status(500)
      throw new Error('You can not unblock yourself')
    }
    const userToUnblock = await User.findById(userId)
    const loggedInUser = await User.findById(_id)
    if (!userToUnblock || !loggedInUser) {
      res.status(404)
      throw new Error('User not found!')
    }
    if (!loggedInUser.blockedList.includes(userId)) {
      res.status(400)
      throw new Error('Not blocking is user!')
    }
    loggedInUser.blockedList = loggedInUser.blockedList.filter(
      (id) => id.toString() != userId
    )
    await loggedInUser.save()
    res.status(200).json({ message: 'Successfully unblocked user!' })
  } catch (error) {
    throw new Error(error)
  }
})

const getBlockedUsers = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate(
      'blockedList',
      'username fullName profilePicture'
    )
    if (!user) {
      res.status(404)
      throw new Error('User not found!')
    }
    const { blockedList, ...data } = user
    res.status(200).json(blockedList)
  } catch (error) {
    throw new Error(error)
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const userToDelete = await User.findById(userId)
    if (!userToDelete) {
      res.status(404)
      throw new Error('User not found!')
    }
    await Post.deleteMany({ user: userId })
    await Post.deleteMany({ 'comments.user': userId })
    await Post.deleteMany({ 'comments.replies.user': userId })
    await Comment.deleteMany({ user: userId })
    await Post.updateMany({ likes: userId }, { $pull: { likes: userId } })
    await User.updateMany(
      { _id: { $in: userToDelete.following } },
      { $pull: { followers: userId } }
    )
    await Comment.updateMany({}, { $pull: { likes: userId } })
    await Comment.updateMany(
      { 'replies.likes': userId },
      { $pull: { 'replies.likes': userId } }
    )
    await Post.updateMany({}, { $pull: { likes: userId } })
    const replyComments = await Comment.find({ 'replies.user': userId })
    await Promise.all(
      replyComments.map(async (comment) => {
        comment.replies = comment.replies.filter(
          (reply) => reply.user.toString() != userId
        )
        await Comment.save()
      })
    )
    await userToDelete.deleteOne()
    res.status(200).json({
      message: 'Everything associated with user is deleted successfully!',
    })
  } catch (error) {
    throw new Error(error)
  }
})

const searchUser = asyncHandler(async (req, res) => {
  const { query } = req.params
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(query, 'i') } },
        { fullName: { $regex: new RegExp(query, 'i') } },
      ],
    })
    res.status(200).json({ users })
  } catch (error) {
    throw new Error(error)
  }
})

const uploadProfilePicture = async (req, res, next) => {
  const { userId } = req.params
  const { filename } = req.file
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: generateFileUrl(filename) },
      { new: true }
    )
    if (!user) {
      throw new CustomError('User not found!', 404)
    }
    res
      .status(200)
      .json({ message: 'Profile picture updated successfully!', user })
  } catch (error) {
    next(error)
  }
}

const uploadCoverPicture = async (req, res, next) => {
  const { userId } = req.params
  const { filename } = req.file
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { coverPicture: generateFileUrl(filename) },
      { new: true }
    )
    if (!user) {
      throw new CustomError('User not found!', 404)
    }
    res
      .status(200)
      .json({ message: 'Cover picture updated successfully!', user })
  } catch (error) {
    next(error)
  }
}

export {
  getUser,
  updateUser,
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getBlockedUsers,
  deleteUser,
  searchUser,
  uploadProfilePicture,
  uploadCoverPicture,
}
