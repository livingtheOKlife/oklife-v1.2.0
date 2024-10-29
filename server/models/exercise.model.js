import mongoose from 'mongoose'

const exerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sets: [
    {
      reps: {
        type: Number,
      },
      weight: {
        type: Number,
      },
    },
  ],
  caloriesBurned: {
    type: Number,
  },
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
