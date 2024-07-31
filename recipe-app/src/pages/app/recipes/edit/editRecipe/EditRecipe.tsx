import { useEffect, useState } from "react";
import { Recipe } from "../../../../../types/editRecipe";
import "./editRecipe.scss";
import { recipeApi } from "../../../../../api/recipes";
import { Link } from "react-router-dom";

function EditRecipeList() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}

		fetchRecipes();
	}, []);

	return (
		<ul className='recipe-container'>
			{recipes.map(recipe => (
				<li className='recipe' key={recipe.id}>
					<p className='recipe-text' style={{ color: "black" }}>
						{recipe.name}
					</p>
					<Link to={`/app/recipes/edit/${recipe.id}`}>
						<button className='recipe-button'>Edytuj</button>
					</Link>
				</li>
			))}
		</ul>
	);
}

export default EditRecipeList;
