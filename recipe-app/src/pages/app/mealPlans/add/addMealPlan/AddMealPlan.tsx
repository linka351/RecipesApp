import { mealPlansApi } from "../../../../../api/mealPlans";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "./types";

const handleSubmit = async (values: WeeklyPlan) => {
	try {
		await mealPlansApi.add(values!);
		alert("Plan posiłków został dodany!");
	} catch (error) {
		alert("Wystąpił błąd podczas dodawania planu posiłków");
	}
};

function AddMealPlan() {
	return (
		<div className='container'>
			<MealPlansForm onSubmit={handleSubmit} />
		</div>
	);
}

export default AddMealPlan;
