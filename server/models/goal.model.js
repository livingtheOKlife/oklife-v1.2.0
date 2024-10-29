import mongoose from 'mongoose'

const goalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Please add a text value'],
  },
  startValue: {
    type: Number,
    required: true,
  },
  currentValue: {
    type: Number,
    requied: true,
  },
  targetValue: {
    type: Number,
    required: true,
  },
})

const Goal = mongoose.model('Goal', goalSchema)

export default Goal
