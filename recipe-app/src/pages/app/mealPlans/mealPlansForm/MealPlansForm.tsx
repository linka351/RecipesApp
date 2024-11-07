import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import MealTable from "../add/addMealPlan/components/mealTable/MealTable";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import Button from "../../../../components/buttons/Button";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";

type Props = {
	initialValues?: WeeklyPlan;
	onSubmit?: (values: WeeklyPlan) => Promise<void>;
};

function MealPlansForm({ initialValues, onSubmit: submitHandler }: Props) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}
		fetchRecipes();
	}, []);

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			if (submitHandler) await submitHandler(values);
			formik.resetForm();
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		} finally {
			formik.setSubmitting(false);
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
		onSubmit: handleSubmit,
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
				<Input
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				<TextArea
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
				/>

				<Input
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

				<Button
					type='submit'
					isSubmitting={formik.isSubmitting}
					disabled={!formik.dirty || !formik.isValid}>
					Dodaj
				</Button>
			</form>
		</div>
	);
}

export default MealPlansForm;
