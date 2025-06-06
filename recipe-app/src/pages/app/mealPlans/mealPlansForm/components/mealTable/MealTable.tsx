import { useState } from "react";
import { DayName } from "../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../types/editRecipe";
import { MealPlan } from "../../../add/addMealPlan/types";
import MealPlanModal from "../mealPlanModal/MealPlanModal";
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDayMeal, setSelectedDayMeal] = useState<{
		day: DayName;
		meal: string;
	} | null>(null);

	const openModal = (day: DayName, meal: string) => {
		setSelectedDayMeal({ day, meal });
		setIsModalOpen(true);
	};

	const handleRecipeSelect = (recipeId: string) => {
		if (selectedDayMeal) {
			onChange(selectedDayMeal.day, selectedDayMeal.meal, recipeId);
		}
		setIsModalOpen(false);
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
											onClick={() => openModal(day, meal)}>
											{recipes.find(
												recipe => recipe.id === selectedRecipes?.[day]?.[meal]
											)?.name || "Wybierz Przepis"}
										</div>
									</div>
								))}
							</>
						))}
					</div>
				)}
			</div>

			{isModalOpen && (
				<MealPlanModal
					onClose={() => setIsModalOpen(false)}
					onSelectRecipe={handleRecipeSelect}
				/>
			)}
		</>
	);
};

export default MealTable;
