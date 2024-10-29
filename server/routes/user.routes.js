import express from 'express'
const router = express.Router()

import {
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
} from '../controllers/user.controllers.js'

import upload from '../middleware/upload.middleware.js'

router.get('/:userId', getUser)
router.put('/update/:userId', updateUser)
router.post('/follow/:userId', followUser)
router.post('/unfollow/:userId', unfollowUser)
router.post('/block/:userId', blockUser)
router.post('/unblock/:userId', unblockUser)
router.get('/blocked/:userId', getBlockedUsers)
router.delete('/delete/:userId', deleteUser)
router.get('/search/:query', searchUser)
router.put(
  '/update-profile-picture/:userId',
  upload.single('profilePicture'),
  uploadProfilePicture
)
router.put(
  '/update-cover-picture/:userId',
  upload.single('coverPicture'),
  uploadCoverPicture
)

export default router
