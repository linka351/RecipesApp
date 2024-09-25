import { useState } from "react";
import { Recipe } from "../../../../../../../types/editRecipe";
import { DayName } from "../../../../../../../types/MealPlan";
import "./mealTable.scss";

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
	onAddMealName: (newMeal: string) => void;
	recipes: Recipe[];
	onChange: (day: DayName, meal: string, recipeId: string) => void;
	selectedRecipes: {
		[key in DayName]?: { [meal: string]: string };
	};
};

const MealTable = ({
	mealName,
	onAddMealName,
	recipes,
	onChange,
	selectedRecipes,
}: MealNamesProps) => {
	const [inputValue, setInputValue] = useState<string>("");

	const [showRecipeList, setShowRecipeList] = useState<{
		[key: string]: boolean;
	}>({});

	const addMealName = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onAddMealName(inputValue.trim());
			setInputValue("");
		}
	};

	const toggleRecipeList = (day: DayName, meal: string) => {
		setShowRecipeList(prevState => ({
			...prevState,
			[`${day}-${meal}`]: !prevState[`${day}-${meal}`],
		}));
	};

	const handleRecipeSelect = (day: DayName, meal: string, recipeId: string) => {
		onChange(day, meal, recipeId);

		setShowRecipeList(prevState => ({
			...prevState,
			[`${day}-${meal}`]: false,
		}));
	};

	return (
		<>
			<div className='meal-table-container'>
				<div className='add-meal'>
					<input
						className='input'
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
										<div
											className='recipe-name'
											onClick={() => toggleRecipeList(day, meal)}>
											{recipes.find(
												recipe => recipe.id === selectedRecipes?.[day]?.[meal]
											)?.name || "Wybierz Przepis"}
										</div>

										{showRecipeList[`${day}-${meal}`] && (
											<div className='recipe-list'>
												{recipes.map(recipe => (
													<div
														className='recipe-name'
														key={recipe.id}
														onClick={() =>
															handleRecipeSelect(day, meal, recipe.id)
														}>
														<p className='recipe-name'>{recipe.name}</p>
													</div>
												))}
											</div>
										)}
									</div>
								))}
							</>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default MealTable;
