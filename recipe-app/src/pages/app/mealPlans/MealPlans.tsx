import { useEffect, useState } from "react";
import { WeeklyPlan } from "./add/addMealPlan/types";
import { Link } from "react-router-dom";
import { mealPlansApi } from "../../../api/mealPlans";
import Input from "../../../components/inputs/Input";

import "./mealPlans.scss";
import Button from "../../../components/buttons/Button";

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
		<div className='meal-plan-container'>
			<div className='search-meal-plan'>
				<p className='meal-plan'>Lista Planów</p>
				<Link className='add-meal-plan' to={"/app/meal-plans/add/"}>
					Dodaj Plan
				</Link>
			</div>
			<Input
				name='searchMealPlan'
				type='text'
				placeholder='Wyszukaj plan...'
				value={searchMealPlan}
				onChange={handleSearch}
			/>
			<ul className='meal-plan-list'>
				{filteredMealPlans.map(mealPlan => (
					<li className='plan-list' key={mealPlan.id}>
						<div className='plan-list-container'>
							<div className='meal-plans-description'>
								<div className='plan-list-name'>
									<p className='meal-plan-name'>{mealPlan.name}</p>
									<p>{mealPlan.dateFrom}</p>
								</div>
								<p className='meal-plan-specification'>
									{mealPlan.description}
								</p>
							</div>
							<div className='plan-buttons'>
								<Link
									className='edit-meal-plan'
									to={`/app/meal-plans/edit/${mealPlan.id}`}>
									Edytuj
								</Link>
								<Button
									className='delete-meal-plan'
									onClick={() => mealPlan.id && handleDelete(mealPlan.id)}>
									Usuń
								</Button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
export default MealPlans;
