import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
import "./detailsRecipe.scss";
import Button from "../../../../components/buttons/Button";
import image from "../../../../images/22204570_6605525.jpg";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";

import { Tooltip as ReactTooltip } from "react-tooltip";
import { STATUS } from "../../../../constants/status.const";
import { useAuth } from "../../../../context/AuthContext";
import { USER_ROLE } from "../../../../constants/user.const";
import Loader from "../../../../components/loader/Loader";

function DetailsRecipe() {
	const [recipe, setRecipe] = useState<Recipe>();

	const navigate = useNavigate();

	const { id } = useParams();
	const { user } = useAuth();

	useEffect(() => {
		if (!id) return;
		const fetchRecipe = async () => {
			const singleRecipe = await recipeApi.get(id);
			setRecipe(singleRecipe);
		};
		fetchRecipe();
	}, [id]);

	const handleDelete = async () => {
		if (!id) return;

		await recipeApi.remove(id);
		navigate("/app/recipes");
	};

	if (!recipe) {
		return <Loader />;
	}

	return (
		<div className='details-wrapper'>
			<div className='bottom-buttons'>
				{(user?.role === USER_ROLE.ADMIN ||
					recipe.status !== STATUS.PUBLIC) && (
					<div className='actions-buttons'>
						<Button
							className='action-button delete-button'
							onClick={handleDelete}
							aria-label='Usuń'
							data-tooltip-id='delete-tooltip'>
							<IoTrashOutline />
						</Button>
						<Link
							to={`/app/recipes/edit/${id}`}
							className='action-button edit-button'
							aria-label='Edytuj'
							data-tooltip-id='edit-tooltip'>
							<MdOutlineModeEdit />
						</Link>
					</div>
				)}
			</div>
			<div className='top-section'>
				<div className='left-col'>
					<div className='image-box'>
						<img
							className='recipe-image'
							src={recipe.image || image}
							alt={`${recipe.name} picture`}
						/>
					</div>
					<div className='ingredients-box'>
						<p className='section-title'>Składniki</p>
						{recipe.ingredients.map((el, i) => (
							<p className='section-content' key={i}>
								{el}
							</p>
						))}
					</div>
				</div>

				<div className='instructions-box'>
					<p className='section-title'>Instrukcje</p>
					{recipe.instructions.map((el, i) => (
						<p className='section-content' key={i}>
							{el}
						</p>
					))}
				</div>
			</div>
			<div className='middle-section'>
				<div className='meta-box'>
					<h1 className='recipe-title'>{recipe.name}</h1>
					<div className='description-box'>
						<p className='section-content'>{recipe.description}</p>
					</div>
				</div>
			</div>
			<ReactTooltip id='delete-tooltip' content='Usuń' place='bottom' />
			<ReactTooltip id='edit-tooltip' content='Edytuj' place='bottom' />
		</div>
	);
}

export default DetailsRecipe;
