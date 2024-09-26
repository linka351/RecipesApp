import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../../api/recipes";
import { Recipe } from "../../../../../types/editRecipe";
import { MealPlan } from "./types";
import MealTable, { days } from "./components/mealTable/MealTable";
import { DayName } from "../../../../../types/MealPlan";

import "./addMealPlan.scss";
import DateInput from "./components/dateInput/DateInput";
import PlanInput from "./components/planInput/PlanInput";
import PlanTextArea from "./components/planTextArea/PlanTextArea";

function AddMealPlan() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}

		fetchRecipes();
	}, []);

	const onSubmit = async (values: MealPlan) => {
		try {
			console.log({ values });

			await recipeApi.addMealPlan(values);
			alert("Plan posiłków został zapisany!");
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		}
	};

	const formik = useFormik<MealPlan>({
		initialValues: {
			name: "",
			description: "",
			dateFrom: "",
			plan: {},
		},
		onSubmit,
	});

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		formik.setFieldValue(`plan.${day}.${meal}`, recipeId);
	};

	const handleAddMealName = (newMeal: string) => {
		formik.setFieldValue("plan", days.reduce((acc, day) => {
			acc[day] = {
				...acc[day],
				[newMeal]: "",
			};
			return acc;
		}, formik.values.plan));
	};

	const mealName = [...new Set(Object.values(formik.values.plan).flatMap(meal => Object.keys(meal)))];

	return (
		<div className='container'>
			<p className='title'>Nowy Plan</p>
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<PlanInput
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				<PlanTextArea
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
				/>

				<DateInput
					name='dateFrom'
					label='Wybierz tydzień'
					type='week'
					onChange={formik.handleChange}
					value={formik.values.dateFrom}
				/>

				<MealTable
					onAddMealName={handleAddMealName}
					mealName={mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={
						formik.values.plan as {
							[key in DayName]?: { [key: string]: string };
						}
					}
				/>

				<button type='submit' className='submit-button'>
					Zapisz Plan
				</button>
			</form>
		</div>
	);
}
export default AddMealPlan;
