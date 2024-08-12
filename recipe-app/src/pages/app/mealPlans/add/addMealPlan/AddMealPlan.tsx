import { useEffect, useState } from "react";
import { Recipe } from "../../../../../types/editRecipe";
import { recipeApi } from "../../../../../api/recipes";

import "./addMealPlan.scss";
import PlanInput from "./components/planInput/PlanInput";
import PlanTextArea from "./components/planTextArea/PlanTextArea";
import { DayName } from "../../../../../types/MealPlan";
import MealTable from "./components/mealTable/MealTable";

export type MealPlan = {
	name: string;
	description: string;
	plan: { [key in DayName]: { [meal: string]: string } };
};

function AddMealPlan() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [mealPlanName, setMealPlanName] = useState("");
	const [mealPlanDescription, setMealPlanDescription] = useState("");
	const [mealPlan, setMealPlan] = useState<{
		[key in DayName]: { [meal: string]: string };
	}>({
		Poniedziałek: {},
		Wtorek: {},
		Środa: {},
		Czwartek: {},
		Piątek: {},
		Sobota: {},
		Niedziela: {},
	});

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}

		fetchRecipes();
	}, []);

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		setMealPlan(prevState => ({
			...prevState,
			[day]: {
				...prevState[day],
				[meal]: recipeId,
			},
		}));
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const mealPlanWithNames = Object.fromEntries(
			Object.entries(mealPlan).map(([day, meals]) => [
				day,
				Object.fromEntries(
					Object.entries(meals).map(([meal, recipeId]) => {
						const recipeName =
							recipes.find(recipe => recipe.id === recipeId)?.name || "";
						return [meal, recipeName];
					})
				),
			])
		) as { [key in DayName]: { [meal: string]: string } };
		try {
			await recipeApi.addMealPlan({
				name: mealPlanName,
				description: mealPlanDescription,
				plan: mealPlanWithNames,
			});

			alert("Plan posiłków został zapisany!");
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		}
	};

	return (
		<div className='container'>
			<p className='title'>Nowy Plan</p>
			<form className='add-meal-plan-form' onSubmit={handleSubmit}>
				<PlanInput value={mealPlanName} onChange={setMealPlanName} />
				<PlanTextArea
					value={mealPlanDescription}
					onChange={setMealPlanDescription}
				/>
				<MealTable
					onChange={handleSelectChange}
					mealPlan={mealPlan}
					recipes={recipes}
				/>
				<button type='submit' className='submit-button'>
					Zapisz Plan
				</button>
			</form>
		</div>
	);
}

export default AddMealPlan;
