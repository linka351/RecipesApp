import { toast } from "react-toastify";

import { mealPlansApi } from "../../../../../api/mealPlans";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "./types";

const handleSubmit = async (values: WeeklyPlan) => {
	try {
		await mealPlansApi.add(values!);
		toast.success("Dodano plan posiłków");
	} catch (error) {
		toast.error("Wystąpił błąd przy dodawaniu planu posiłków");
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
