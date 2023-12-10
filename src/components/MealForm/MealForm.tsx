import React, {useState} from 'react';
import {MealFormProps} from '../../types';

const MealForm: React.FC<MealFormProps> = ({onSave}) => {
  const [time, setTime] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [calories, setCalories] = useState<number | ''>('');

  const handleSave = () => {
    const timestamp = new Date().getTime();
    const newMeal = {
      id: `meal_${timestamp}`,
      time,
      description,
      calories: +calories
    };

    onSave(newMeal);
    setTime('');
    setDescription('');
    setCalories('');
  };

  return (
    <div>
      <label>Time:</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="Breakfast">Breakfast</option>
        <option value="Snack">Snack</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <label>Description:</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label>Calories:</label>
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default MealForm;
