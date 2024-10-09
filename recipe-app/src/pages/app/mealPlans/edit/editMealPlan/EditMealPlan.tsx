import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { recipeApi } from "../../../../../api/recipes";
import { WeeklyPlan } from "../../add/addMealPlan/types";

function EditMealPlan() {
	const { id } = useParams();
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

	if (!initialValues) return <p>Ładowanie...</p>;

	return (
		<div>
			<MealPlansForm
				initialValues={initialValues}
				onSubmitSuccess={handleSuccess}
			/>
		</div>
	);
}

export default EditMealPlan;
