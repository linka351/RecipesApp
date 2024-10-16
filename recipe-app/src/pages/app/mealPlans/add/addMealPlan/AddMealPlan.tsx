import { mealPlansApi } from "../../../../../api/mealPlans";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "./types";

const handleSuccess = async (values: WeeklyPlan) => {
	await mealPlansApi.add(values!);
	alert("Plan posiłków został dodany!");
};

function AddMealPlan() {
	return (
		<div className='container'>
			<MealPlansForm onSubmit={handleSuccess} />
		</div>
	);
}

export default AddMealPlan;
