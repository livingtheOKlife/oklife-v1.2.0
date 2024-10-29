import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
      },
    ],
    meals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
