import React, {useState} from 'react';
import {Meal, MealItemProps} from '../../types';

const MealItem: React.FC<MealItemProps> = ({meal, onDelete, onSave}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editedMeal, setEditedMeal] = useState<Meal>({...meal});

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedMeal);
    setEditing(false);
  };

  return (
    <div>
      <div>
        {editing ? (
          <div>
            <label>Time:</label>
            <select
              value={editedMeal.time}
              onChange={(e) => setEditedMeal({...editedMeal, time: e.target.value})}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Snack">Snack</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <label>Description:</label>
            <input
              type="text"
              value={editedMeal.description}
              onChange={(e) => setEditedMeal({...editedMeal, description: e.target.value})}
            />
            <label>Calories:</label>
            <input
              type="number"
              value={editedMeal.calories}
              onChange={(e) => setEditedMeal({...editedMeal, calories: +e.target.value})}
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <p>Time: {meal.time}</p>
            <p>Description: {meal.description}</p>
            <p>Calories: {meal.calories}</p>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealItem;
