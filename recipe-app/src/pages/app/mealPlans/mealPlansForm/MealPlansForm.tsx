import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import MealTable from "../add/addMealPlan/components/mealTable/MealTable";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import {
	newMealNameValidationSchema,
	validationSchema,
} from "./MealPlansForm.validation";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";

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

	console.log("Formik values:", formik.values);
	console.log("Formik touched:", formik.touched);
	console.log("Formik errors:", formik.errors);

	const handleSelectChange = (day: DayName, meal: string, recipeId: string) => {
		formik.setFieldValue(`plan.${day}.${meal}`, recipeId);
	};

	const handleAddMealName = () => {
		try {
			// Sprawdzamy walidację newMealName
			newMealNameValidationSchema.validateSync({
				newMealName: formik.values.newMealName,
			});

			// Dodajemy posiłek do mealName
			formik.setFieldValue("mealName", [
				...formik.values.mealName,
				formik.values.newMealName,
			]);

			// Czyścimy pole newMealName i resetujemy dotknięcie oraz błąd
			formik.setFieldValue("newMealName", "");
			formik.setFieldTouched("newMealName", false);
			formik.setFieldError("newMealName", "");
		} catch (error) {
			if (error instanceof Error) {
				// Ustawiamy błąd w formik.errors.newMealName
				formik.setFieldError("newMealName", error.message);
			} else {
				formik.setFieldError("newMealName", "An unknown error occurred");
			}
			// Ustawiamy pole jako dotknięte, aby wyświetlić błąd
			formik.setFieldTouched("newMealName", true, false);
		}
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
				<div className='add-meal'>
					<Input
						name='newMealName'
						type='text'
						value={formik.values.newMealName}
						onChange={formik.handleChange}
						placeholder='Wpisz nazwę posiłku'
					/>
					<button type='button' onClick={handleAddMealName}>
						Add
					</button>
					{formik.touched.newMealName && formik.errors.newMealName && (
						<div className='error-message'>{formik.errors.newMealName}</div>
					)}
				</div>
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
