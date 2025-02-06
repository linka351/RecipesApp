import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import { validationSchema } from "./MealPlansForm.validation";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";
import MealTable from "./components/mealTable/MealTable";
import NewMealName from "../add/addMealPlan/components/newMealName/NewMealName";

type Props = {
	initialValues?: WeeklyPlan;
	onSubmit?: (values: WeeklyPlan) => void;
};

function MealPlansForm({ initialValues, onSubmit: onSubmit }: Props) {
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
			if (onSubmit) onSubmit(values);
			formik.resetForm();
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
		validationSchema,
		onSubmit: handleSubmit,
	});

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		formik.setFieldValue(`plan.${day}.${meal}`, recipeId);
	};

	const handleAddMealName = (mealName: string) => {
		formik.setFieldValue("mealName", [...formik.values.mealName, mealName]);
	};

	return (
		<div className='container'>
			<p className='title'>{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}</p>
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<Input
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name || ""}
					onBlur={formik.handleBlur}
				/>
				<TextArea
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={formik.touched.description}
					error={formik.errors.description || ""}
					onBlur={formik.handleBlur}
				/>

				<Input
					name='dateFrom'
					label='Wybierz tydzień'
					type='week'
					onChange={formik.handleChange}
					value={formik.values.dateFrom}
					touched={formik.touched.dateFrom}
					error={formik.errors.dateFrom || ""}
					onBlur={formik.handleBlur}
				/>

				<NewMealName onAdd={handleAddMealName} />

				<MealTable
					mealName={formik.values.mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={formik.values.plan}
				/>
				{formik.touched.mealName && formik.errors.mealName && (
					<div>{formik.errors.mealName}</div>
				)}

				<button type='submit' className='submit-button'>
					{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz Plan"}
				</button>
			</form>
		</div>
	);
}

export default MealPlansForm;
