import { useState } from "react";
import { DayName } from "../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../types/editRecipe";
import { MealPlan } from "../../../add/addMealPlan/types";
import MealPlanModal from "../mealPlanModal/MealPlanModal";

import "./mealTable.scss";
import MealTableContainer from "./components/MealTableContainer";
import { days } from "../../../../../../constants/days.const";

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
			<MealTableContainer
				mealName={mealName}
				days={days}
				recipes={recipes}
				selectedRecipes={selectedRecipes}
				openModal={openModal}
			/>

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
