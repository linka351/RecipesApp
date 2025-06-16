import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { recipeApi } from "../../../../api/recipes";
import { DayName } from "../../../../types/MealPlan";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { Recipe } from "../../../../types/editRecipe";
import { validationSchema } from "./MealPlansForm.validation";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";
import "./mealPlansForm.scss";
import Button from "../../../../components/buttons/Button";
import NewMealName from "../add/addMealPlan/components/newMealName/NewMealName";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../../components/loader/Loader";
import MealPlans from "./components/mealTable/MealPlans";

type Props = {
	initialValues?: WeeklyPlan;
	onSubmit?: (values: WeeklyPlan) => Promise<void>;
};

function MealPlansForm({ initialValues, onSubmit: onSubmit }: Props) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipes = async () => {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		};
		fetchRecipes();
	}, []);

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			setIsSubmitting(true);
			if (onSubmit) await onSubmit(values);
			formik.resetForm();
			navigate("/app/meal-plans");
		} catch (error) {
			toast.error("Wystąpił błąd przy dodawaniu planu posiłków");
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
			status: "private",
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
			{isSubmitting && <Loader />}
			<form onSubmit={formik.handleSubmit} className='add-meal-plan-form'>
				<div className='meal-form-name'>
					<h1 className='meal-plan-title'>
						{initialValues?.id ? "Edytuj Plan" : "Nowy Plan"}
					</h1>
				</div>
				<Input
					placeholder='Wpisz nazwę planu'
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name || ""}
					onBlur={formik.handleBlur}
					inputClassName='meal-plans-form-input'
					label='Nazwa planu'
				/>
				<TextArea
					placeholder='Opis planu'
					textareaClassName='meal-textarea'
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={formik.touched.description}
					error={formik.errors.description || ""}
					onBlur={formik.handleBlur}
					label='Opis planu'
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
						errorClassName='date-error'
					/>
				</div>

				<NewMealName onAdd={handleAddMealName} />
				<div className='meal-table-error-position'>
					<MealPlans
						mealName={formik.values.mealName}
						recipes={recipes}
						onChange={handleSelectChange}
						selectedRecipes={formik.values.plan}
					/>
					{formik.touched.mealName && formik.errors.mealName && (
						<div className='meal-table-error'>{formik.errors.mealName}</div>
					)}
				</div>
				<div className='meal-submit-container'>
					<Button type='submit' className='meal-submit'>
						{initialValues?.id ? "Zaktualizuj Plan" : "Zapisz"}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default MealPlansForm;
