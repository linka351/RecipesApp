import { Link, useNavigate, useParams } from "react-router-dom";
import { WeeklyPlan } from "../add/addMealPlan/types";
import { useEffect, useState } from "react";
import { mealPlansApi } from "../../../../api/mealPlans";
import Button from "../../../../components/buttons/Button";
import "./detailsMealPlans.scss";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { formatWeekRange } from "../mealPlans.utils";
import { STATUS } from "../../../../constants/status.const";
import MealTableContainer from "./components/MealTableContainer";
import { useAuth } from "../../../../context/AuthContext";
import { USER_ROLE } from "../../../../constants/user.const";
import Loader from "../../../../components/loader/Loader";

function DetailsMealPlans() {
	const [mealPlan, setMealPlan] = useState<WeeklyPlan>();
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const navigate = useNavigate();

	const { id } = useParams();
	const { user } = useAuth();

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

	if (!mealPlan) {
		return <Loader />;
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
				{(user?.role === USER_ROLE.ADMIN ||
					mealPlan.status !== STATUS.PUBLIC) && (
					<>
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
					</>
				)}
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
			<MealTableContainer mealPlan={mealPlan} recipes={recipes} />

			<ReactTooltip id='delete-tooltip' content='Usuń' place='bottom' />
			<ReactTooltip id='edit-tooltip' content='Edytuj' place='bottom' />
		</div>
	);
}

export default DetailsMealPlans;
