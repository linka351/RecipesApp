import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import {
	newMealNameValidationSchema,
	validationSchema,
} from "./MealPlansForm.validation";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";
import MealTable from "./components/mealTable/MealTable";
import "./mealPlansForm.scss";
import Button from "../../../../components/buttons/Button";

type FormikData = WeeklyPlan & {
	newMealName: string;
};

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
		try {
			newMealNameValidationSchema.validateSync({
				newMealName: formik.values.newMealName,
			});

			formik.setFieldValue("mealName", [
				...formik.values.mealName,
				formik.values.newMealName,
			]);

			formik.setFieldValue("newMealName", "");
			formik.setFieldTouched("newMealName", false);
			formik.setFieldError("newMealName", "");
		} catch (error) {
			if (error instanceof Error) {
				formik.setFieldError("newMealName", error.message);
			} else {
				formik.setFieldError("newMealName", "An unknown error occurred");
			}
			formik.setFieldTouched("newMealName", true, false);
		}
	};

	return (
		<div className='meal-container'>
			<div className='meal-form-name'>
				<p className='title'>
					{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}
				</p>
				<Button type='submit' className='meal-submit'>
					{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz"}
				</Button>
			</div>
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<Input
					placeholder='Wpisz nazwę planu'
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name || ""}
					onBlur={formik.handleBlur}
				/>
				<TextArea
					placeholder='Opis planu'
					textAreaClassName='meal-textarea'
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={formik.touched.description}
					error={formik.errors.description || ""}
					onBlur={formik.handleBlur}
				/>
				<div className='date-position'>
					<Input
						inputClassName='date'
						name='dateFrom'
						labelClassName='date-label'
						label='Wybierz tydzień'
						type='week'
						onChange={formik.handleChange}
						value={formik.values.dateFrom}
						touched={formik.touched.dateFrom}
						error={formik.errors.dateFrom || ""}
						onBlur={formik.handleBlur}
					/>
				</div>
				<div className='add-meal'>
					<Input
						inputClassName='new-meal-input'
						name='newMealName'
						type='text'
						value={formik.values.newMealName}
						onChange={formik.handleChange}
						placeholder='Wpisz nazwę posiłku'
					/>
					<Button
						type='button'
						onClick={handleAddMealName}
						className='new-meal-submit'>
						Add
					</Button>
				</div>
				{formik.touched.newMealName && formik.errors.newMealName && (
					<div className='error-message'>{formik.errors.newMealName}</div>
				)}

				<MealTable
					mealName={formik.values.mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={formik.values.plan}
				/>
				{formik.touched.mealName && formik.errors.mealName && (
					<div>{formik.errors.mealName}</div>
				)}
			</form>
		</div>
	);
}
export default MealPlansForm;
