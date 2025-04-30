import { useNavigate, useParams } from "react-router-dom";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { useEffect, useState } from "react";
import { mealPlansApi } from "../../../../api/mealPlans";
import Button from "../../../../components/buttons/Button";
import "./detailsMealPlans.scss";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
//import MealTable from "../mealPlansForm/components/mealTable/MealTable";

function DetailsMealPlans() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [mealPlan, setMealPlan] = useState<WeeklyPlan>();
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		const fetchMealPlan = async () => {
			if (id) {
				const singleMealPlan = await mealPlansApi.get(id);
				const userRecipes = await recipeApi.getAll();

				setMealPlan(singleMealPlan);
				setRecipes(userRecipes);
			}
		};
		fetchMealPlan();
	}, [id]);

	console.log(mealPlan);

	const getRecipeNameById = (id: string) => {
		const recipe = recipes.find(recipe => recipe.id === id);
		return recipe ? recipe.name : "Brak nazwy";
	};

	if (!mealPlan) {
		return <div className='loading'>Ładowanie planu...</div>;
	}

	const days = Object.keys(mealPlan.plan);
	const mealName = mealPlan.mealName;
	return (
		<div className='meal-plan'>
			<h2>{mealPlan.name}</h2>
			<p>Tydzień: {mealPlan.dateFrom}</p>
			<p>Opis: {mealPlan.description}</p>

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
									<div key={day}>
										<div key={meal} className='meal-cell'>
											{getRecipeNameById(mealPlan.plan[day][meal])}
										</div>
									</div>
								))}
							</>
						))}
					</div>
				)}
			</div>

			<Button onClick={() => navigate(`/app/recipes`)}>Powrót</Button>
		</div>
	);
}

export default DetailsMealPlans;
