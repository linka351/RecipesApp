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
import "./mealPlansForm.scss";
import Button from "../../../../components/buttons/Button";
import NewMealName from "../add/addMealPlan/components/newMealName/NewMealName";
import { Oval } from "react-loader-spinner";

type Props = {
	initialValues?: WeeklyPlan;
	onSubmit?: (values: WeeklyPlan) => void;
};

function MealPlansForm({ initialValues, onSubmit: onSubmit }: Props) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}
		fetchRecipes();
	}, []);

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			setIsSubmitting(true);
			if (onSubmit) onSubmit(values);
			formik.resetForm();
		} catch (error) {
			alert("Wystąpił błąd przy zapisywaniu planu.");
		} finally {
			setIsSubmitting(false);
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
		<div className='meal-container'>
			{isSubmitting && (
				<div className='full-page-loader'>
					<Oval
						height={100}
						width={100}
						color='#ffffff'
						ariaLabel='Zapisywanie przepisu'
						secondaryColor='#ffffff'
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				</div>
			)}
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<div className='meal-form-name'>
					<p className='title'>
						{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}
					</p>
					<Button type='submit' className='meal-submit'>
						{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz"}
					</Button>
				</div>
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

				<NewMealName onAdd={handleAddMealName} />

				<MealTable
					mealName={formik.values.mealName}
					recipes={recipes}
					onChange={handleSelectChange}
					selectedRecipes={formik.values.plan}
				/>
				{formik.touched.mealName && formik.errors.mealName && (
					<div className='meal-table-error'>{formik.errors.mealName}</div>
				)}
			</form>
		</div>
	);
}

export default MealPlansForm;
