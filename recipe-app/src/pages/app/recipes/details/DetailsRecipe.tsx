import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe } from "../../../../types/editRecipe";
import { recipeApi } from "../../../../api/recipes";
import "./detailsRecipe.scss";
import Button from "../../../../components/buttons/Button";

function DetailsRecipe() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState<Recipe>();

	useEffect(() => {
		const fetchRecipe = async () => {
			if (id) {
				const singleRecipe = await recipeApi.get(id);
				setRecipe(singleRecipe);
			}
		};

		fetchRecipe();
	}, [id]);

	console.log(recipe?.ingredients);

	const handleDelete = async () => {
		if (id) {
			await recipeApi.remove(id);
			navigate("/app/recipes");
		}
	};

	if (!recipe) {
		return <div className='loading'>Ładowanie przepisu...</div>;
	}

	return (
		<div className='details-wrapper'>
			<div className='top-section'>
				<div className='image-box'>
					<img className='recipe-image' src={recipe.image} alt={recipe.name} />
				</div>
				<div className='ingredients-box'>
					<p className='section-title'>Składniki</p>
					{recipe.ingredients.map((el, i) => (
						<p className='section-content' key={i}>
							{el}
						</p>
					))}
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

			<div className='bottom-buttons'>
				<Button
					className='details-buttons back-button '
					onClick={() => navigate("/app/recipes")}>
					Powrót
				</Button>
				<div>
					<Button
						className='details-buttons delete-button'
						onClick={handleDelete}>
						Usuń
					</Button>
					<Button
						className='details-buttons edit-button'
						onClick={() => navigate(`/app/recipes/edit/${id}`)}>
						Edytuj
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DetailsRecipe;
