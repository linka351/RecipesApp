import { useState } from "react";
import { Recipe } from "../../../../../../../types/editRecipe";
import { DayName } from "../../../../../../../types/MealPlan";
//import { Plan } from "../../types";

const days: DayName[] = [
	"Poniedziałek",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Sobota",
	"Niedziela",
];

type MealNamesProps = {
	mealName: string[];
	onChange: (day: DayName, meal: string, recipeId: string) => void;
	recipes: Recipe[];
	onAddMealName: (newMeal: string) => void;
};

const MealTable = ({
	mealName,
	onAddMealName,
	onChange,
	recipes,
}: MealNamesProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const addMealName = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onAddMealName(inputValue.trim());
			setInputValue("");
		}
	};

	return (
		<div className='meal-table-container'>
			<div className='add-meal'>
				<input
					type='text'
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					placeholder='Wpisz nazwę posiłku'
				/>
				<button onClick={addMealName}>Add</button>
			</div>

			{mealName.length > 0 && (
				<div className='meal-plan-grid'>
					<div className='header-cell'>
						<p>Nazwa Posiłku</p>
					</div>
					{days.map(day => (
						<div key={day} className='header-cell'>
							{day}
						</div>
					))}

					{mealName.map(meal => (
						<>
							<div key={meal} className='meal-header'>
								{meal}
							</div>
							{days.map(day => (
								<div key={`${day}-${meal}`} className='meal-select'>
									<select
										value={mealName}
										onChange={e => onChange(day, meal, e.target.value)}>
										<option value=''>Wybierz przepis</option>
										{recipes.map(recipe => (
											<option key={recipe.id} value={recipe.id}>
												{recipe.name}
											</option>
										))}
									</select>
								</div>
							))}
						</>
					))}
				</div>
			)}
		</div>
	);
};
export default MealTable;
