import { useEffect, useState } from "react";
import { WeeklyPlan } from "./add/addMealPlan/types";
import { Link } from "react-router-dom";
import { mealPlansApi } from "../../../api/mealPlans";
import Input from "../../../components/inputs/Input";

import "./mealPlans.scss";
import Button from "../../../components/buttons/Button";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { formatWeekRange } from "./mealPlans.utils";

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
				<h1 className='meal-plan'>Lista Planów</h1>
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
				inputClassName='meal-plan-input'
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
									className='plan-button edit-meal-plan'
									to={`/app/meal-plans/edit/${mealPlan.id}`}>
									<MdOutlineModeEdit />
								</Link>
								<Button
									className='plan-button delete-meal-plan'
									onClick={() => mealPlan.id && handleDelete(mealPlan.id)}>
									<IoTrashOutline />
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
