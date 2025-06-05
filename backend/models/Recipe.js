const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  instructions: [String],
  category: String,
  ingredients: [String],
  time: String,
  vegetarian: Boolean,
  image: String
});

module.exports = mongoose.model('Recipe', recipeSchema);
