import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { recipeApi } from "../../../../../api/recipes";
import { WeeklyPlan } from "../../add/addMealPlan/types";

function EditMealPlan() {
	const { id } = useParams<{ id: string }>();
	const [initialValues, setInitialValues] = useState<WeeklyPlan | null>(null);

	useEffect(() => {
		async function fetchMealPlan() {
			const mealPlan = await recipeApi.getMealPlanById(id!);
			setInitialValues(mealPlan);
		}

		fetchMealPlan();
	}, [id]);

	const handleSuccess = () => {
		alert("Plan posiłków został zaktualizowany!");
	};

	return initialValues ? (
		<MealPlansForm
			initialValues={initialValues}
			onSubmitSuccess={handleSuccess}
		/>
	) : (
		<div>Loading ...</div>
	);
}

export default EditMealPlan;
