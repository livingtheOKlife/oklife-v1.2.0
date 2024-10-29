import mongoose from 'mongoose'

const ingredientSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    requied: true,
  },
  weight: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  cabohydrates: {
    type: String,
    required: true,
  },
  proteins: {
    type: String,
    required: true,
  },
  fats: {
    type: String,
    required: true,
  },
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export default Ingredient
