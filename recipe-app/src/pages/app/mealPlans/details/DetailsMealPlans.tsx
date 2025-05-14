import { Link, useNavigate, useParams } from "react-router-dom";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { useEffect, useState } from "react";
import { mealPlansApi } from "../../../../api/mealPlans";
import Button from "../../../../components/buttons/Button";
import "./detailsMealPlans.scss";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
import { DayName } from "../../../../types/MealPlan";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { formatWeekRange } from "../mealPlans.utils";

function DetailsMealPlans() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [mealPlan, setMealPlan] = useState<WeeklyPlan>();

	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const orderedDays: DayName[] = [
		"Poniedziałek",
		"Wtorek",
		"Środa",
		"Czwartek",
		"Piątek",
		"Sobota",
		"Niedziela",
	];

	useEffect(() => {
		if (!id) return;

		const fetchMealPlan = async () => {
			const singleMealPlan = await mealPlansApi.get(id);
			const userRecipes = await recipeApi.getAll();
			setMealPlan(singleMealPlan);
			setRecipes(userRecipes);
		};
		fetchMealPlan();
	}, [id]);

	const getRecipeLabel = (id: string | undefined) => {
		const recipe = recipes.find(recipe => recipe.id === id);
		return recipe?.name || "Brak przepisu";
	};

	if (!mealPlan) {
		return <div className='loading'>Ładowanie planu...</div>;
	}

	const handleDelete = async (id: string) => {
		try {
			await mealPlansApi.remove(id);
			navigate("/app/meal-plans");
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	};

	return (
		<div className='meal-plan'>
			<div className='details-buttons'>
				<Link
					className='plan-button edit-meal-plan'
					to={`/app/meal-plans/edit/${mealPlan.id}`}
					aria-label='Edytuj'
					data-tooltip-id='edit-tooltip'>
					<MdOutlineModeEdit />
				</Link>

				<Button
					className='plan-button delete-meal-plan'
					onClick={() => mealPlan.id && handleDelete(mealPlan.id)}
					aria-label='Usuń'
					data-tooltip-id='delete-tooltip'>
					<IoTrashOutline />
				</Button>
			</div>
			<div className='details-wrapper'>
				<h2 className='title'>{mealPlan.name}</h2>
				<p className='week'>
					<span className='label'>Tydzień:</span>{" "}
					{formatWeekRange(mealPlan.dateFrom)}
				</p>
				<p className='description'>
					<span className='label'>Opis: </span> {mealPlan.description}
				</p>
			</div>
			<div className='meal-table-container'>
				{mealPlan.mealName.length > 0 && (
					<div className='meal-plan-grid'>
						<div className='header-cell'>
							<p>Nazwa Posiłku</p>
						</div>
						{orderedDays.map(day => (
							<div key={day} className='header-cell'>
								{day}
							</div>
						))}

						{mealPlan.mealName.map(meal => (
							<>
								<div key={`meal-${meal}`} className='meal-header'>
									{meal}
								</div>
								{orderedDays.map(day => {
									const recipeId = mealPlan.plan[day]?.[meal];
									const recipeName = getRecipeLabel(recipeId);
									return (
										<div key={`${day}-${meal}`} className='meal-cell'>
											{recipeName}
										</div>
									);
								})}
							</>
						))}
					</div>
				)}
			</div>

			<ReactTooltip id='delete-tooltip' content='Usuń' place='bottom' />
			<ReactTooltip id='edit-tooltip' content='Edytuj' place='bottom' />
		</div>
	);
}

export default DetailsMealPlans;
