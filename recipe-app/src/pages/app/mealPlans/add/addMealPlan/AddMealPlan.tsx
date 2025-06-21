import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { mealPlansApi } from "../../../../../api/mealPlans";
import MealPlansForm from "../../mealPlansForm/MealPlansForm";
import { WeeklyPlan } from "./types";
import { useAuth } from "../../../../../context/AuthContext";
import GetUserStatus from "../../../../../utils/GetUserStatus";

function AddMealPlan() {
	const { user } = useAuth();

	const handleSubmit = async (values: WeeklyPlan) => {
		try {
			if (!user) {
				return;
			}
			const status = GetUserStatus(user.role);

			await mealPlansApi.add({
				...values,
				userId: user.id,
				status,
			});
			toast.success("Dodano plan posiłków");
		} catch (error) {
			toast.error("Wystąpił błąd przy dodawaniu planu posiłków");
		}
	};

	return (
		<div className='container'>
			<MealPlansForm onSubmit={handleSubmit} />
		</div>
	);
}

export default AddMealPlan;
