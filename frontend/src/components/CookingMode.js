import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CookingMode.css';

function CookingMode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/recipes/${id}`).then(res => {
      setRecipe(res.data);
    });
  }, [id]);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, recipe.instructions.length - 1));
    setTimeLeft(null);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setTimeLeft(null);
  };

  useEffect(() => {
    if (recipe) {
      const match = recipe.instructions[currentStep].match(/(\\d+)\\s*(minute|min)/i);
      if (match) {
        setTimeLeft(parseInt(match[1]) * 60);
      }
    }
  }, [currentStep, recipe]);

  useEffect(() => {
    if (!timeLeft) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);

        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }

        const utterance = new SpeechSynthesisUtterance("Finish");
        speechSynthesis.speak(utterance);
          return null;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="cooking-mode">
      <div className="cooking-header">
        <h2>{recipe.name}</h2>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
        ></div>
      </div>

      <div className="instruction-step">
        <h3>Step {currentStep + 1} of {recipe.instructions.length}</h3>
        <p>{recipe.instructions[currentStep]}</p>
        {timeLeft !== null && (
          <p className="timer">⏱ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
        )}
      </div>

      <div className="step-controls">
        <button disabled={currentStep === 0} onClick={prevStep}>⬅ Prev</button>
        <button disabled={currentStep === recipe.instructions.length - 1} onClick={nextStep}>Next ➡</button>
      </div>
    </div>
  );
}

export default CookingMode;
