import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipeApi } from "../../../../../api/recipes";
import RecipeForm, { FormValues } from "../../recipesForm/RecipesForm";

function SingleEditRecipe() {
	const { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = useState<FormValues | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchRecipe() {
			if (id) {
				const recipe = await recipeApi.getOne(id);
				setRecipe(recipe);
				if (recipe) {
					setRecipe({
						id: recipe.id,
						name: recipe.name,
						description: recipe.description,
						instructions: recipe.instructions,
						ingredients: recipe.ingredients,
					});
				}
			}
		}

		fetchRecipe();
	}, [id]);

	async function handleFormSubmitSuccess() {
		navigate("/app/recipes/edit");
	}

	return recipe ? (
		<RecipeForm
			initialValues={recipe}
			onSubmitSuccess={handleFormSubmitSuccess}
		/>
	) : (
		<div>Loading...</div>
	);
}

export default SingleEditRecipe;
