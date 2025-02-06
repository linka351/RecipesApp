import { useEffect, useState } from "react";
import { WeeklyPlan } from "./add/addMealPlan/types";
import { Link } from "react-router-dom";
import { mealPlansApi } from "../../../api/mealPlans";
import Input from "../../../components/inputs/Input";
import { startOfISOWeek, endOfISOWeek, parseISO, format } from "date-fns";
import { pl } from "date-fns/locale";

const formatWeekRange = (weekString: string) => {
	if (!weekString) return "";

	const [year, week] = weekString.split("-W");
	const weekNumber = parseInt(week, 10);

	const firstDayOfYear = parseISO(`${year}-01-04`);
	const startDate = startOfISOWeek(firstDayOfYear);
	startDate.setDate(startDate.getDate() + (weekNumber - 1) * 7);
	const endDate = endOfISOWeek(startDate);

	return `${format(startDate, "d", { locale: pl })}-${format(endDate, "d MMMM yyyy", { locale: pl })}`;
};

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

	const filteredMealPlans = mealPlans.filter(mealPlan =>
		mealPlan.name.toLowerCase().includes(searchMealPlan.toLowerCase())
	);

	return (
		<>
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
			{filteredMealPlans.map(mealPlan => (
				<div key={mealPlan.id}>
					<ul>
						<li>
							{mealPlan.name}
							<br />
							{formatWeekRange(mealPlan.dateFrom)}
							<div>
								<Link to={`/app/meal-plans/edit/${mealPlan.id}`}>
									<button>Edytuj</button>
								</Link>
								<button
									onClick={() => mealPlan.id && handleDelete(mealPlan.id)}>
									Usuń
								</button>
							</div>
						</li>
					</ul>
				</div>
			))}
		</>
	);
}

export default MealPlans;
