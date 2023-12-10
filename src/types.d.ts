export interface Meal {
  id: string;
  time: string;
  description: string;
  calories: number;
}

export interface MealItemProps {
  meal: Meal;
  onDelete: () => void;
  onSave: (meal: Meal) => void;
}

export interface MealFormProps {
  onSave: (meal: Meal) => void;
}

export interface MealListProps {
  meals: Meal[];
  onDelete: (mealId: string) => void;
  onSave: (meal: Meal) => void;
}