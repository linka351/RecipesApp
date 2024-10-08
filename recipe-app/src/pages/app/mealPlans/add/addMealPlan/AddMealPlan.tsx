import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../../api/recipes";
import { Recipe } from "../../../../../types/editRecipe";
import { WeeklyPlan } from "./types";
import MealTable from "./components/mealTable/MealTable";
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

	const onSubmit = async (values: WeeklyPlan) => {
		try {
			await recipeApi.addMealPlan(values);
			alert("Plan posiłków został zapisany!");
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		}
	};

	const formik = useFormik<WeeklyPlan>({
		initialValues: {
			name: "",
			description: "",
			dateFrom: "",
			mealName: [],
			plan: {},
		},
		onSubmit,
	});

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		formik.setFieldValue(`plan.${day}.${meal}`, recipeId);
	};

	const handleAddMealName = (newMeal: string) => {
		formik.setFieldValue("mealName", [...formik.values.mealName, newMeal]);
	};

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
					mealName={formik.values.mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={formik.values.plan}
				/>

				<button type='submit' className='submit-button'>
					Zapisz Plan
				</button>
			</form>
		</div>
	);
}
export default AddMealPlan;
