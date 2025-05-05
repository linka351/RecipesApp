import { useNavigate, useParams } from "react-router-dom";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { useEffect, useState } from "react";
import { mealPlansApi } from "../../../../api/mealPlans";
import Button from "../../../../components/buttons/Button";
import "./detailsMealPlans.scss";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
import { DayName } from "../../../../types/MealPlan";

function DetailsMealPlans() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [mealPlan, setMealPlan] = useState<WeeklyPlan>();
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const orderedDays: DayName[] = [
		"Poniedziałek",
		"Wtorek",
		"Środa",
		"Czwartek",
		"Piątek",
		"Sobota",
		"Niedziela",
	];

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

	const getRecipeNameById = (id: string) => {
		const recipe = recipes.find(recipe => recipe.id === id);
		return recipe ? recipe.name : "Brak przepisu";
	};

	if (!mealPlan) {
		return <div className='loading'>Ładowanie planu...</div>;
	}

	const mealNames = mealPlan.mealName;

	return (
		<div className='meal-plan'>
			<h2 className='title'>{mealPlan.name}</h2>
			<p className='week'>Tydzień: {mealPlan.dateFrom}</p>
			<p className='description'>Opis: {mealPlan.description}</p>

			<div className='meal-table-container'>
				{mealNames.length > 0 && (
					<div className='meal-plan-grid'>
						<div className='header-cell'>
							<p>Nazwa Posiłku</p>
						</div>
						{orderedDays.map(day => (
							<div key={day} className='header-cell'>
								{day}
							</div>
						))}

						{mealNames.map(meal => (
							<>
								<div key={`meal-${meal}`} className='meal-header'>
									{meal}
								</div>
								{orderedDays.map(day => {
									const recipeId = mealPlan.plan[day]?.[meal];
									const recipeName = recipeId
										? getRecipeNameById(recipeId)
										: "Brak przepisu";
									return (
										<div key={`${day}-${meal}`} className='meal-cell'>
											{recipeName}
										</div>
									);
								})}
							</>
						))}
					</div>
				)}
			</div>

			<Button
				className='back-button'
				onClick={() => navigate(`/app/meal-plans`)}>
				Powrót
			</Button>
		</div>
	);
}

export default DetailsMealPlans;
