const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  instructions: String,
  category: String,
  isVegetarian: Boolean,
  preparationTime: Number,
  imageUrl: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);