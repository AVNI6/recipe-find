const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

// Read JSON data once at startup
let recipes = [];
try {
  const data = fs.readFileSync('./recipe.json');
  recipes = JSON.parse(data);
} catch (err) {
  console.error('Error reading JSON file:', err);
}

app.get('/api/recipes', (req, res) => {
  const { search = '', category = '' } = req.query;
  const filtered = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? r.category.toLowerCase() === category.toLowerCase() : true)
  );
  res.json(filtered);
});

app.get('/api/recipes/:name', (req, res) => {
  const recipe = recipes.find(r => r.name.toLowerCase() === req.params.name.toLowerCase());
  if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
  res.json(recipe);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:8000');
});
