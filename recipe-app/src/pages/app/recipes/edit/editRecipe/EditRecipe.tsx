import { useEffect, useState } from "react";
import { recipeApi } from "../../../../../api/recipes";
import { Formik, FormikHelpers } from "formik";

interface Recipe {
	id: string;
	name: string;
	description: string;
	ingredients: string;
	instructions: string;
}

function EditRecipe() {
	const [recipes, setRecipes] = useState<any[]>([]);
	const [edit, setEdit] = useState(false);
	const [editRecipe, setEditRecipe] = useState({
		id: "",
		name: "",
		description: "",
		ingredients: "",
		instructions: "",
	});
	useEffect(() => {
		const fetchData = async () => {
			const recipesAll = await recipeApi.getAll();
			const mappedRecipes = recipesAll.map(recipe => ({
				id: recipe.id,
				name: recipe.name,
				description: recipe.description,
				ingredients: recipe.ingredients,
				instructions: recipe.instructions,
			}));
			setRecipes(mappedRecipes);
		};
		fetchData();
	}, []);

	const handleEditClick = (recipe: Recipe) => {
		setEdit(true);
		setEditRecipe({
			id: recipe.id,
			name: recipe.name,
			description: recipe.description,
			ingredients: recipe.ingredients,
			instructions: recipe.instructions,
		});
	};

	const handleSaveClick = async (
		values: Recipe,
		{ setSubmitting }: FormikHelpers<Recipe>
	) => {
		const updatedData = {
			name: values.name,
			description: values.description,
			ingredients: values.ingredients,
			instructions: values.instructions,
		};

		await recipeApi.updateRecipe(editRecipe.id, updatedData);

		const recipesData = await recipeApi.getAll();
		setRecipes(recipesData);

		setEdit(false);
		setSubmitting(false);
	};

	return (
		<>
			<ul>
				{recipes.map(recipe => (
					<li key={recipe.id}>
						<p>{recipe.name}</p>
						<button onClick={() => handleEditClick(recipe)}>Edit</button>
					</li>
				))}
			</ul>
			{edit && (
				<div>
					<h2>Edit Recipe</h2>
					<Formik initialValues={editRecipe} onSubmit={handleSaveClick}>
						{({ values, handleChange, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<label>
									Title:
									<input
										type='text'
										name='name'
										value={values.name}
										onChange={handleChange}
									/>
								</label>
								<label>
									Description:
									<input
										type='text'
										name='description'
										value={values.description}
										onChange={handleChange}
									/>
								</label>
								<br />
								<label>
									Ingredients:
									<input
										type='text'
										name='ingredients'
										value={values.ingredients}
										onChange={handleChange}
									/>
								</label>
								<br />
								<label>
									Instructions:
									<input
										type='text'
										name='instructions'
										value={values.instructions}
										onChange={handleChange}
									/>
								</label>
								<br />
								<button type='submit'>Save</button>
							</form>
						)}
					</Formik>
				</div>
			)}
		</>
	);
}

export default EditRecipe;
