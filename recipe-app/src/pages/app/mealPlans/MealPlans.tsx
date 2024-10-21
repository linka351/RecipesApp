import { useEffect, useState } from "react";
import { WeeklyPlan } from "./add/addMealPlan/types";
import { Link } from "react-router-dom";
import { mealPlansApi } from "../../../api/mealPlans";
import Input from "../../../components/inputs/Input";

function MealPlans() {
	const [mealPlans, setMealPlans] = useState<WeeklyPlan[]>([]);
	const [searchMealPlan, setSearchMealPlan] = useState<string>("");

	useEffect(() => {
		async function fetchMealPlans() {
			const mealPlanList = await mealPlansApi.getAll();
			setMealPlans(mealPlanList);
		}

		fetchMealPlans();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await mealPlansApi.remove(id);
			setMealPlans(prevMealPlans =>
				prevMealPlans.filter(mealPlan => mealPlan.id !== id)
			);
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchMealPlan(e.target.value);
	};

	return mealPlans.map(mealPlan => (
		<div>
			<p>Lista Planów</p>
			<Input
				name='searchMealPlan'
				type='text'
				placeholder='Wyszukaj plan...'
				value={searchMealPlan}
				onChange={handleSearch}
			/>
			<Link to={"/app/meal-plans/add/"}>
				<button>Dodaj Plan</button>
			</Link>
			<ul key={mealPlan.id}>
				<li>
					{mealPlan.name}
					<div>
						<Link to={`/app/meal-plans/edit/${mealPlan.id}`}>
							<button>Edytuj</button>
						</Link>

						<button onClick={() => mealPlan.id && handleDelete(mealPlan.id)}>
							Usuń
						</button>
					</div>
				</li>
			</ul>
		</div>
	));
}
export default MealPlans;
