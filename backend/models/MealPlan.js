const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
  title: String,
  planner: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);
