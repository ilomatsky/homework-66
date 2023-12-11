import React from 'react';
import MealItem from '../MealItem/MealItem';
import {MealListProps} from '../../types';

const MealList: React.FC<MealListProps> = ({meals, onDelete, onSave, loading}) => {
  return (
    <div>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          meal={meal}
          onDelete={() => onDelete(meal.id)}
          onSave={onSave}
          isDisabled={loading}
        />
      ))}
    </div>
  );
};

export default MealList;
