import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import CookingMode from './components/CookingMode';
import MealPlanner from './components/MealPlanner';
import SavedPlans from './components/SavedPlans';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/cook/:id" element={<CookingMode />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/planner/:id" element={<MealPlanner />} />
        <Route path="/saved-plans" element={<SavedPlans />} />
      </Routes>
    </Router>
  );
}

export default App;