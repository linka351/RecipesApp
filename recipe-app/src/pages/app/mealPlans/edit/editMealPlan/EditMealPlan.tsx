import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "../../add/addMealPlan/types";
import { mealPlansApi } from "../../../../../api/mealPlans";

function EditMealPlan() {
	const { id } = useParams<{ id: string }>();
	const [initialValues, setInitialValues] = useState<WeeklyPlan | null>(null);

	useEffect(() => {
		async function fetchMealPlan() {
			const mealPlan = await mealPlansApi.get(id!);
			setInitialValues(mealPlan);
		}

		fetchMealPlan();
	}, [id]);

	const handleSuccess = async (values: WeeklyPlan) => {
		await mealPlansApi.update(id!, values!);
		alert("Plan posiłków został zaktualizowany!");
	};

	return initialValues ? (
		<MealPlansForm initialValues={initialValues} onSubmit={handleSuccess} />
	) : (
		<div>Loading ...</div>
	);
}

export default EditMealPlan;
