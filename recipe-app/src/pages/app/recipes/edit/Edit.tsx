import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipeApi } from "../../../../api/recipes";
import RecipesForm, { FormValues } from "../recipesForm/RecipesForm";
import Loader from "../../../../components/loader/Loader";

function Edit() {
	const { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = useState<FormValues | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchRecipe() {
			const singleRecipe = await recipeApi.get(id!);
			setRecipe(singleRecipe);
		}

		fetchRecipe();
	}, [id]);

	async function handleFormSubmit() {
		navigate("/app/recipes");
	}

	return recipe ? (
		<RecipesForm initialValues={recipe} onSubmit={handleFormSubmit} />
	) : (
		<Loader />
	);
}

export default Edit;
