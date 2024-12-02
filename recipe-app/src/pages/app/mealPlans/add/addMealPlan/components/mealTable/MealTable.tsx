import { useState } from "react";
import { Recipe } from "../../../../../../../types/editRecipe";
import { DayName } from "../../../../../../../types/MealPlan";
import "./mealTable.scss";
import { MealPlan } from "../../types";

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
	recipes: Recipe[];
	onChange: (day: DayName, meal: string, recipeId: string) => void;
	selectedRecipes: MealPlan;
};

const MealTable = ({
	mealName,
	recipes,
	onChange,
	selectedRecipes,
}: MealNamesProps) => {
	const [showRecipeList, setShowRecipeList] = useState<{
		[key: string]: boolean;
	}>({});

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
