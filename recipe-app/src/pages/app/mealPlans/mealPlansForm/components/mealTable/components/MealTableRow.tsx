import { Fragment } from "react";
import { DayName } from "../../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../../types/editRecipe";
import MealTableCell from "./MealTableCell";

type Props = {
	meal: string;
	days: DayName[];
	recipes: Recipe[];
	selectedRecipes: Record<string, Record<string, string>>;
	openModal: (day: DayName, meal: string) => void;
};

function MealTableRow({
	meal,
	days,
	recipes,
	selectedRecipes,
	openModal,
}: Props) {
	return (
		<Fragment key={`row-${meal}`}>
			<div className='meal-header'>{meal}</div>
			{days.map(day => (
				<MealTableCell
					key={`${day}-${meal}`}
					day={day}
					meal={meal}
					recipes={recipes}
					selectedRecipeId={selectedRecipes?.[day]?.[meal]}
					onClick={() => openModal(day, meal)}
				/>
			))}
		</Fragment>
	);
}

export default MealTableRow;
