import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './MealPlanner.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

function MealPlanner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [planId, setPlanId] = useState(null);
  const [planner, setPlanner] = useState({});
  const [showNamePopup, setShowNamePopup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Failed to load recipes:', err));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/mealplans/${id}`)
        .then(res => {
          setPlanner(res.data.planner);
          setTitle(res.data.title);
          setPlanId(res.data._id);
        })
        .catch(err => console.error('Failed to load meal plan:', err));
    }
  }, [id]);

  const handleSelect = (day, meal, recipeId) => {
    const updated = {
      ...planner,
      [day]: {
        ...planner[day],
        [meal]: recipeId
      }
    };
    setPlanner(updated);
  };

  const isPlannerEmpty = () => {
    return !Object.values(planner).some(day =>
      Object.values(day || {}).some(value => value && value.trim() !== '')
    );
  };

  const handleSave = () => {
    if (isPlannerEmpty()) {
      alert("⚠️ Please select at least one recipe before saving your meal plan.");
      return;
    }

    if (!planId && (!title || title.trim() === '')) {
      setShowNamePopup(true);
      return;
    }

    const payload = { title: title.trim(), planner };

    if (planId) {
      axios.put(`http://localhost:8000/api/mealplans/${planId}`, payload)
        .then(() => alert('✅ Meal plan updated!'))
        .catch(() => alert('❌ Failed to update meal plan.'));
    } else {
      axios.post('http://localhost:8000/api/mealplans', payload)
        .then(() => alert('✅ Meal plan saved!'))
        .catch(() => alert('❌ Failed to save meal plan.'));
    }
  };

  const handleConfirmName = () => {
    if (!tempTitle.trim()) {
      alert("❌ Plan name is required.");
      return;
    }

    setTitle(tempTitle.trim());
    setShowNamePopup(false);

    const payload = { title: tempTitle.trim(), planner };

    axios.post('http://localhost:8000/api/mealplans', payload)
      .then(() => alert('✅ Meal plan saved!'))
      .catch(() => alert('❌ Failed to save meal plan.'));
  };

  return (
    <div className="meal-planner">
      <button className="close-btn" onClick={() => navigate(-1)}>❌</button>
      <h2>Weekly Meal Planner</h2>

      <input
        type="text"
        placeholder="Enter Plan Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="plan-title-input"
      />

      <table>
        <thead>
          <tr>
            <th>Day</th>
            {meals.map(meal => <th key={meal}>{meal}</th>)}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <td><strong>{day}</strong></td>
              {meals.map(meal => (
                <td key={meal}>
                  <select
                    value={planner[day]?.[meal] || ''}
                    onChange={(e) => handleSelect(day, meal, e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {recipes.map(r => (
                      <option key={r._id} value={r._id}>{r.name}</option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="save-btn" onClick={handleSave}>💾 Save</button>

      {showNamePopup && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <p>Enter a name for your meal plan:</p>
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder="e.g., Weekly Plan"
            />
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleConfirmName}>Save</button>
              <button className="cancel-btn" onClick={() => setShowNamePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MealPlanner;
