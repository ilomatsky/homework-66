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
    <form>
      <label>Time:</label>
      <select required value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="" disabled>Select a category</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Snack">Snack</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <label>Description:</label>
      <input required type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
      <label>Calories:</label>
      <input
        required
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </form>
  );
};

export default MealForm;
