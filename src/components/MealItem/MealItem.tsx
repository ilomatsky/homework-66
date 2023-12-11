import React, {useState} from 'react';
import {Meal, MealItemProps} from '../../types';

const MealItem: React.FC<MealItemProps> = ({meal, onDelete, onSave, isDisabled}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editedMeal, setEditedMeal] = useState<Meal>({...meal});

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedMeal);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedMeal({...meal});
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <form className="card p-3">
          <div className="form-group mb-3">
            <label className="form-label">Time:</label>
            <select
              className="form-select"
              value={editedMeal.time}
              onChange={(e) => setEditedMeal({...editedMeal, time: e.target.value})}>

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
              type="text"
              value={editedMeal.description}
              onChange={(e) => setEditedMeal({...editedMeal, description: e.target.value})}
            />
          </div>
          <div className="form-group mb-4">
            <label className="form-label">Calories:</label>
            <input
              className="form-control"
              type="number"
              value={editedMeal.calories}
              onChange={(e) => setEditedMeal({...editedMeal, calories: +e.target.value})}
            />
          </div>
          <button onClick={handleSaveClick} className="btn btn-success me-2 mb-3">Save</button>
          <button onClick={handleCancelClick} className="btn btn-secondary">Cancel</button>
        </form>
      ) : (
        <div className="card p-3 text-start">
          <p className="card-text">Time: {meal.time}</p>
          <h5 className="card-title mb-3">Description: {meal.description}</h5>
          <p className="card-text">Calories: {meal.calories}</p>
          <button className="btn btn-primary me-2 mb-3" onClick={handleEditClick} disabled={isDisabled}>Edit</button>
          <button className="btn btn-danger" onClick={onDelete} disabled={isDisabled}>Delete</button>
        </div>
      )}
    </>
  );
};

export default MealItem;
