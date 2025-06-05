import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SavedPlans.css';

function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://recipe-find-2.onrender.com/api/mealplans')
      .then(res => setPlans(res.data));
  }, []);

  const handleLoad = (id) => {
    navigate(`/planner/${id}`);
  };

  const handleDelete = async (id) => {
    // if (window.confirm('Are you sure you want to delete this meal plan?')) {
    //   await axios.delete(`http://localhost:8000/api/mealplans/${id}`);
    //   setPlans(plans.filter(plan => plan._id !== id));
    // }
      setConfirmDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`https://recipe-find-2.onrender.com/api/mealplans/${confirmDeleteId}`);
      setPlans(plans.filter(plan => plan._id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error(error);
      alert('Failed to delete meal plan.');
    }
  };

  return (
    <div className="saved-plans-page">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>📂 All Saved Meal Plans</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan._id} className="plan-item">
            <button onClick={() => handleLoad(plan._id)}>📖 {plan.title}</button>
            <div className="button-group">
             <button onClick={() => handleLoad(plan._id)}>✏️</button>
             <button className="delete-btn" onClick={() => handleDelete(plan._id)}>🗑</button>
            </div>
          </li>
        ))}
      </ul>

      {confirmDeleteId && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <p>Are you sure you want to delete this meal plan?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={handleDeleteConfirmed}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setConfirmDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default SavedPlans;
