import { Recipe } from "../../../../../../../types/editRecipe";
import { DayName } from "../../../../../../../types/MealPlan";
import { Plan } from "../../types";

const mealNames = [
	"Śniadanie",
	"Drugie Śniadanie",
	"Zupa",
	"Drugie danie",
	"Kolacja",
];

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
	mealPlan: Plan;
	onChange: (day: DayName, meal: string, recipeId: string) => void;
	recipes: Recipe[];
};

function MealTable({ mealPlan, onChange, recipes }: MealNamesProps) {
	return (
		<div className='meal-plan-grid'>
			<div className='empty-space'></div>
			{mealNames.map(meal => (
				<div key={meal} className='meal-header'>
					{meal}
				</div>
			))}

			{days.map(day => (
				<>
					<div key={`${day}-label`} className='day-label'>
						{day}
					</div>
					{mealNames.map(meal => (
						<div key={`${day}-${meal}`} className='meal-select'>
							<select
								value={
									mealPlan[day][meal as keyof (typeof mealPlan)[typeof day]] ||
									""
								}
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
	);
}

export default MealTable;
