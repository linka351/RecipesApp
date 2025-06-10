import { ImSpoonKnife } from "react-icons/im";
import { DayName } from "../../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../../types/editRecipe";

type Props = {
	day: DayName;
	meal: string;
	recipes: Recipe[];
	selectedRecipeId?: string;
	onClick: () => void;
};

function MealTableCell({ recipes, selectedRecipeId, onClick }: Props) {
	const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

	return (
		<div className='meal-select'>
			<div className='recipe-name' onClick={onClick}>
				{selectedRecipe ? (
					<>
						<ImSpoonKnife />
						{selectedRecipe.name}
					</>
				) : (
					"Wybierz Przepis"
				)}
			</div>
		</div>
	);
}

export default MealTableCell;
