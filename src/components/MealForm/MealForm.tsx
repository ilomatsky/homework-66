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
    <div className="col-6 mx-auto">
      <form className="card p-3">
        <div className="form-group mb-3">
          <label className="form-label">Time:</label>
          <select
            className="form-select"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}>

            <option value="" disabled>Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Snack">Snack</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Description:</label>
          <input
            className="form-control"
            required
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-group mb-4">
          <label>Calories:</label>
          <input
            className="form-control"
            required
            type="number"
            value={calories}
            onChange={(e) => setCalories(parseInt(e.target.value))}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default MealForm;
