import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import MealTable from "../add/addMealPlan/components/mealTable/MealTable";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import { validationSchema } from "./MealPlansForm.validation";

type FormikData = WeeklyPlan & {
	newMealName: string;
};
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";

type Props = {
	initialValues?: FormikData;
	onSubmit?: (values: WeeklyPlan) => void;
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

	const handleSubmit = async ({ newMealName, ...values }: FormikData) => {
		try {
			if (submitHandler) submitHandler(values);
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		}
	};

	const formik = useFormik<FormikData>({
		initialValues: initialValues || {
			name: "",
			description: "",
			dateFrom: "",
			mealName: [],
			newMealName: "",
			plan: {},
		},
		validationSchema,
		onSubmit: handleSubmit,
	});

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		formik.setFieldValue(`plan.${day}.${meal}`, recipeId);
	};

	const handleAddMealName = () => {
		formik.setFieldTouched("newMealName", true);

		validationSchema.validateSyncAt("newMealName", formik.values);

		formik.setFieldValue("mealName", [
			...formik.values.mealName,
			formik.values.newMealName,
		]);
		formik.setFieldTouched("newMealName", false);
		formik.setFieldValue("newMealName", "");
	};

	return (
		<div className='container'>
			<p className='title'>{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}</p>
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<Input
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={!!formik.touched.name}
					errors={formik.errors.name || ""}
				/>
				<TextArea
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={!!formik.touched.description}
					errors={formik.errors.description || ""}
				/>

				<Input
					name='dateFrom'
					label='Wybierz tydzień'
					type='week'
					onChange={formik.handleChange}
					value={formik.values.dateFrom}
					touched={!!formik.touched.dateFrom}
					errors={formik.errors.dateFrom || ""}
				/>

				<MealTable
					mealName={formik.values.mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={formik.values.plan}
					onAddMealName={handleAddMealName}
				/>

				<button type='submit' className='submit-button'>
					{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz Plan"}
				</button>
			</form>
		</div>
	);
}
export default MealPlansForm;
