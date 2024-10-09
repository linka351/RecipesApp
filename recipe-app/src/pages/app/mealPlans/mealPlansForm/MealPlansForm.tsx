import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import MealTable from "../add/addMealPlan/components/mealTable/MealTable";
import { DayName } from "../../../../types/MealPlan";
import DateInput from "../add/addMealPlan/components/dateInput/DateInput";
import PlanInput from "../add/addMealPlan/components/planInput/PlanInput";
import PlanTextArea from "../add/addMealPlan/components/planTextArea/PlanTextArea";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";

interface AddEditMealPlanProps {
	initialValues?: WeeklyPlan;
	onSubmitSuccess?: () => void;
}

function MealPlansForm({
	initialValues,
	onSubmitSuccess,
}: AddEditMealPlanProps) {
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
			if (initialValues?.id) {
				await recipeApi.updateMealPlan(initialValues.id, values);
				alert("Plan posiłków został zaktualizowany!");
			} else {
				await recipeApi.addMealPlan(values);
				alert("Plan posiłków został zapisany!");
			}
			if (onSubmitSuccess) onSubmitSuccess();
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		}
	};

	const formik = useFormik<WeeklyPlan>({
		initialValues: initialValues || {
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
			<p className='title'>{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}</p>
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
					{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz Plan"}
				</button>
			</form>
		</div>
	);
}

export default MealPlansForm;
