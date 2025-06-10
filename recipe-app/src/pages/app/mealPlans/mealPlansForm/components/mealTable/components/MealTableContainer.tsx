import { DayName } from "../../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../../types/editRecipe";
import MealTableHeaderRow from "./MealTableHeaderRow";
import MealTableRow from "./MealTableRow";

type MealTableContainerProps = {
	mealName: string[];
	days: DayName[];
	recipes: Recipe[];
	selectedRecipes: Record<string, Record<string, string>>; // day -> meal -> recipeId
	openModal: (day: DayName, meal: string) => void;
};

function MealTableContainer({
	mealName,
	days,
	recipes,
	selectedRecipes,
	openModal,
}: MealTableContainerProps) {
	if (!mealName.length) return null;

	return (
		<div className='meal-table-container'>
			<div className='meal-plan-grid'>
				<MealTableHeaderRow days={days} />
				{mealName.map(meal => (
					<MealTableRow
						key={meal}
						meal={meal}
						days={days}
						recipes={recipes}
						selectedRecipes={selectedRecipes}
						openModal={openModal}
					/>
				))}
			</div>
		</div>
	);
}

export default MealTableContainer;
