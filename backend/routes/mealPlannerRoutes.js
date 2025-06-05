const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');

// Create a meal plan
router.post('/mealplans', async (req, res) => {
  try {
    const newPlan = new MealPlan(req.body);
    const saved = await newPlan.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all meal plans
router.get('/mealplans', async (req, res) => {
  const plans = await MealPlan.find().sort({ createdAt: -1 });
  res.json(plans);
});

// Get one plan
router.get('/mealplans/:id', async (req, res) => {
  const plan = await MealPlan.findById(req.params.id);
  res.json(plan);
});

// Update plan
router.put('/mealplans/:id', async (req, res) => {
  const updated = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/mealplans/:id', async (req, res) => {
  try {
    await MealPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plan deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
});


module.exports = router;
