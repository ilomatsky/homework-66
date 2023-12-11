import React, {useState, useEffect} from 'react';
import axiosApi from './axiosApi';
import MealList from './components/MealList/MealList';
import MealForm from './components/MealForm/MealForm';
import {Meal} from './types';
import './App.css';

const App: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`/meals.json`);
      if (response.data) {
        const mealsData: Meal[] = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setMeals(mealsData);
        updateTotalCalories(mealsData);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTotalCalories = (mealsData: Meal[]) => {
    const total = mealsData.reduce((sum, meal) => sum + meal.calories, 0);
    setTotalCalories(total);
  };

  const handleDeleteMeal = async (mealId: string) => {
    try {
      setLoading(true);
      await axiosApi.delete(`/meals/${mealId}.json`);
      setMeals(meals.filter((meal) => meal.id !== mealId));
      updateTotalCalories(meals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeal = async (meal: Meal) => {
    try {
      setLoading(true);
      if (meal.id) {
        await axiosApi.put(`/meals/${meal.id}.json`, meal);
      } else {
        await axiosApi.post(`/meals.json`, meal);
      }
      fetchMeals();
    } catch (error) {
      console.error('Error saving meal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Total Calories: {totalCalories}</h1>
      <div className="row">
        <MealForm onSave={handleSaveMeal}/>
        {loading ? (
          <div className="text-center col-6">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <MealList meals={meals} onDelete={handleDeleteMeal} onSave={handleSaveMeal} loading={loading}/>
        )}
      </div>
    </div>
  );
};

export default App;
