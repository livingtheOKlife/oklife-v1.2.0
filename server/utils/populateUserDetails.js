import asyncHandler from 'express-async-handler'

const populateUserDetails = asyncHandler(async (comments) => {
  for (const comment of comments) {
    await comment.populate('user', 'username fullName profilePicture')
    if (comment.replies.length > 0) {
      await comment.populate('replies.user', 'username fullName profilePicture')
    }
  }
})

export default populateUserDetails
