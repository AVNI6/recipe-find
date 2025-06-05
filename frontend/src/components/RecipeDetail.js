import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate(); 


useEffect(() => {
  axios.get(`https://recipe-find-2.onrender.com/recipes/${id}`).then(res => {
    setRecipe(res.data);
  }).catch(err => console.error("Error loading recipe:", err));
}, [id]);


  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button> 
        <h2>{recipe.name}</h2>
        <button className="shopping-btn" onClick={() => setShowList(true)}>🛒 Shopping List</button>
      </div>
      {showList && (
        <div className="shopping-modal">
          <div className="shopping-modal-content">
            <span className="close-btn" onClick={() => setShowList(false)}>❌</span>
            <h3>Shopping List</h3>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <img src={recipe.image} alt={recipe.name} />
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Time:</strong> {recipe.time}</p>
      <p><strong>Vegetarian:</strong> {recipe.vegetarian ? 'Yes' : 'No'}</p>

      <h3>Ingredients:</h3>
      <p>{recipe.ingredients.join(', ')}</p>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
      </ol>
      <Link to={`/cook/${recipe._id}`}>
      <button className="shopping-btn">👨‍🍳 Start Cooking Mode</button>
      </Link>
      
    </div>
  );
}

export default RecipeDetail;
