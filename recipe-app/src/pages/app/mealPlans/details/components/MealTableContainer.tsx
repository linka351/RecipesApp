import { Fragment } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { WeeklyPlan } from "../../add/addMealPlan/types";
import { Recipe } from "../../../../../types/editRecipe";
import { days } from "../../../../../constants/days.const";

type MealTableContainerProps = {
	mealPlan: WeeklyPlan;
	recipes: Recipe[];
};

function MealTableContainer({ mealPlan, recipes }: MealTableContainerProps) {
	const getRecipeLabel = (id: string | undefined) => {
		const recipe = recipes.find(recipe => recipe.id === id);
		return recipe?.name || "Brak przepisu";
	};

	if (!mealPlan.mealName.length) return null;

	return (
		<div className='meal-table-container'>
			<div className='meal-plan-grid'>
				<div className='header-cell'>
					<p>Nazwa Posiłku</p>
				</div>
				{days.map(day => (
					<div key={day} className='header-cell'>
						{day}
					</div>
				))}

				{mealPlan.mealName.map(meal => (
					<Fragment key={`row-${meal}`}>
						<div className='meal-header'>{meal}</div>
						{days.map(day => {
							const recipeId = mealPlan.plan[day]?.[meal];
							const recipeName = getRecipeLabel(recipeId);

							return (
								<div key={`${day}-${meal}`} className='meal-cell'>
									{recipeName !== "Brak przepisu" ? (
										<>
											<ImSpoonKnife className='meal-icon' />
											{recipeName}
										</>
									) : (
										<p>Brak przepisu</p>
									)}
								</div>
							);
						})}
					</Fragment>
				))}
			</div>
		</div>
	);
}

export default MealTableContainer;
