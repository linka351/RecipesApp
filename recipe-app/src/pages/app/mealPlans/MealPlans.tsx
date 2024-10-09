import { useEffect, useState } from "react";
import { WeeklyPlan } from "./add/addMealPlan/types";
import { recipeApi } from "../../../api/recipes";
import { Link } from "react-router-dom";

function MealPlans() {
	const [mealPlans, setMealPlans] = useState<WeeklyPlan[]>([]);

	useEffect(() => {
		async function fetchMealPlans() {
			const mealPlanList = await recipeApi.getAllWeeklyPlans();
			setMealPlans(mealPlanList);
		}

		fetchMealPlans();
	}, []);
	return mealPlans.map(mealPlan => (
		<div key={mealPlan.id}>
			<Link to={`/app/meal-plan/edit/${mealPlan.id}`}>
				<p>{mealPlan.name}</p>
			</Link>
		</div>
	));
}

export default MealPlans;
