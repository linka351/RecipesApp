import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "../../add/addMealPlan/types";
import { mealPlansApi } from "../../../../../api/mealPlans";

function EditMealPlan() {
	const { id } = useParams<{ id: string }>();
	const [initialValues, setInitialValues] = useState<WeeklyPlan | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchMealPlan() {
			const mealPlan = await mealPlansApi.get(id!);
			setInitialValues(mealPlan);
		}

		fetchMealPlan();
	}, [id]);

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			await mealPlansApi.update(id!, values!);
			alert("Plan posiłków został zaktualizowany!");
			navigate("/app/meal-plans");
		} catch (error) {
			alert("Wystąpił błąd podczas aktualizacji planu posiłków");
		}
	};

	return initialValues ? (
		<MealPlansForm initialValues={initialValues} onSubmit={handleSubmit} />
	) : (
		<div>Loading ...</div>
	);
}

export default EditMealPlan;
