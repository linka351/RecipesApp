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

	if (!recipe) {
		return <div className='loading'>Ładowanie przepisu...</div>;
	}

	return (
		<div className='recipe-details'>
			<img className='recipe-image' src={recipe.image} alt={recipe.name} />

			<div className='recipe-content'>
				<h1 className='recipe-title'>{recipe.name}</h1>

				<div className='recipe-section'>
					<p className='details-header'>Opis</p>
					<p className='details-text'>{recipe.description}</p>
				</div>

				<div className='recipe-section'>
					<p className='details-header'>Składniki</p>
					{recipe.ingredients.map((el, index) => (
						<p className='details-text' key={index}>
							{el}
						</p>
					))}
				</div>

				<div className='recipe-section'>
					<p className='details-header'>Instrukcje</p>
					{recipe.instructions.map((el, index) => (
						<p className='details-text' key={index}>
							{el}
						</p>
					))}
				</div>

				<div className='recipe-buttons'>
					<Button onClick={() => navigate("/app/recipes")}>Powrót</Button>
					<Button onClick={() => navigate(`/app/recipes/edit/${id}`)}>
						Edytuj
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DetailsRecipe;
