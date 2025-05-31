import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [vegFilter, setVegFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  useEffect(() => {
    let url = `http://localhost:8000/recipes`;
    axios.get(url).then(res => {
      let data = res.data;

      if (search) {
  data = data.filter(r =>
    Object.values(r).some(value =>
      typeof value === "string" && value.toLowerCase().includes(search.toLowerCase())
    )
  );
}
      if (category) {
        data = data.filter(r => r.category === category);
      }
      if (vegFilter) {
        data = data.filter(r => String(r.vegetarian) === vegFilter);
      }
      if (timeFilter) {
        data = data.filter(r => r.time <= timeFilter);
      }
      setRecipes(data);
    });
  }, [search, category, vegFilter, timeFilter]);

  const clearFilter = (setter) => setter('');

  return (
    <div className="recipe-container">
      <header>
        <h1>Recipe Finder</h1>
        <input
          type="text"
          id="searchInput"
          placeholder="Search recipes..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      
      <div className="filters">
        <div className="filter-item">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Snack">Snack</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
          {category && <span className="clear-btn" onClick={() => clearFilter(setCategory)}>❌</span>}
        </div>

        <div className="filter-item">
          <select value={vegFilter} onChange={(e) => setVegFilter(e.target.value)}>
            <option value="">All</option>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
          </select>
          {vegFilter && <span className="clear-btn" onClick={() => clearFilter(setVegFilter)}>❌</span>}
        </div>

        <div className="filter-item">
          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option value="">All Times</option>
            <option value="15">Under 15 min</option>
            <option value="20">Under 20 min</option>
            <option value="30">Under 30 min</option>
            <option value="45">Under 45 min</option>
          </select>
          {timeFilter && <span className="clear-btn" onClick={() => clearFilter(setTimeFilter)}>❌</span>}
        </div>
      </div>

      <div className="card-container" id="recipeContainer">
        {recipes.map(recipe => (
          <div key={recipe.id} className="card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.description.slice(0, 60)}...</p>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
