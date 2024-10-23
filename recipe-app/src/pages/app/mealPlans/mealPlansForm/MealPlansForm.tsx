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
import { validationSchema } from "./MealPlansForm.validation";

type Props = {
	initialValues?: WeeklyPlan;
	onSubmit?: (values: WeeklyPlan) => void;
};

function MealPlansForm({ initialValues, onSubmit: submitHandler }: Props) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [newMeal, setNewMeal] = useState<string>("");

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}
		fetchRecipes();
	}, []);

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			if (submitHandler) submitHandler(values);
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

	const handleAddMealName = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (newMeal.trim() !== "") {
			formik.setFieldValue("mealName", [
				...formik.values.mealName,
				newMeal.trim(),
			]);
			setNewMeal("");
		}
	};

	const handleNewMealChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMeal(e.target.value);
	};

	console.log(formik.values.mealName);
	return (
		<div className='container'>
			<p className='title'>{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}</p>
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<PlanInput
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={!!formik.touched.name}
					errors={formik.errors.name || ""}
				/>
				<PlanTextArea
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={!!formik.touched.name}
					errors={formik.errors.description || ""}
				/>

				<DateInput
					name='dateFrom'
					label='Wybierz tydzień'
					type='week'
					onChange={formik.handleChange}
					value={formik.values.dateFrom}
					touched={!!formik.touched.name}
					errors={formik.errors.dateFrom || ""}
				/>
				<div className='add-meal'>
					<input
						className='input'
						type='text'
						value={newMeal}
						onChange={handleNewMealChange}
						placeholder='Wpisz nazwę posiłku'
					/>
					<button onClick={handleAddMealName}>Add</button>
					{formik.touched.mealName && formik.errors.mealName && (
						<div>{formik.errors.mealName}</div>
					)}
				</div>
				<MealTable
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
