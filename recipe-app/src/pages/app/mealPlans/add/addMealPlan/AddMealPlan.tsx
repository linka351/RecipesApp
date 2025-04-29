import { mealPlansApi } from "../../../../../api/mealPlans";
import { useAuth } from "../../../../../context/AuthContext";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "./types";

function AddMealPlan() {
	const { user } = useAuth();

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			if (!user) {
				return;
			}
			const status = user.role === "admin" ? "public" : "private";
			await mealPlansApi.add({
				...values,
				userId: user.id,
				status,
			});
			alert("Plan posiłków został dodany!");
		} catch (error) {
			alert("Wystąpił błąd podczas dodawania planu posiłków");
		}
	};

	return (
		<div className='container'>
			<MealPlansForm onSubmit={handleSubmit} />
		</div>
	);
}

export default AddMealPlan;
