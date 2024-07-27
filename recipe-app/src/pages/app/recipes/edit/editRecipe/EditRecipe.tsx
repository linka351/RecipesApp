import { useEffect, useState } from "react";
import { recipeApi } from "../../../../../api/recipes";
import { Formik, FormikHelpers } from "formik";
import { Recipe } from "../../../../../types/editRecipe";
import { FaRegEdit } from "react-icons/fa";

import "./editRecipe.scss";
import EditRecipeList from "./components/editRecipeList/EditRecipeList";
import EditRecipeInput from "./components/editRecipesInput/EditRecipesInput";

function EditRecipe() {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [edit, setEdit] = useState(false);
	const [editIngredientIndex, setEditIngredientIndex] = useState<number | null>(
		null
	);
	const [editInstructionIndex, setEditInstructionIndex] = useState<
		number | null
	>(null);
	const [editRecipe, setEditRecipe] = useState<Recipe>({
		id: "",
		name: "",
		description: "",
		ingredients: [],
		instructions: [],
	});

	useEffect(() => {
		const fetchData = async () => {
			const recipesAll = await recipeApi.getAll();
			setRecipes(recipesAll);
		};
		fetchData();
	}, []);
	const handleEditClick = (recipe: Recipe) => {
		setEdit(true);
		setEditRecipe(recipe);
	};

	const handleEditInstructionClick = (index: number) => {
		setEditInstructionIndex(index);
	};

	const handleEditIngredientClick = (index: number) => {
		setEditIngredientIndex(index);
	};

	const handleInstructionChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean | undefined
		) => void
	) => {
		const newInstructions = [...editRecipe.instructions];
		newInstructions[index] = e.target.value;
		setFieldValue("instructions", newInstructions);
	};

	const handleIngredientChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		setFieldValue: (
			field: string,
			value: any,
			shouldValidate?: boolean | undefined
		) => void
	) => {
		const newIngredients = [...editRecipe.ingredients];
		newIngredients[index] = e.target.value;
		setFieldValue("ingredients", newIngredients);
	};

	const onSubmit = async (
		values: Recipe,
		{ setSubmitting }: FormikHelpers<Recipe>
	) => {
		const { id, ...updatedData } = values;
		await recipeApi.update(id, updatedData);
		const recipesData = await recipeApi.getAll();
		setRecipes(recipesData);
		setEdit(false);
		setSubmitting(false);
	};

	return (
		<div className='edit-recipe'>
			{!edit ? (
				<EditRecipeList onClick={handleEditClick} data={recipes} />
			) : (
				<div className='edit-container'>
					<p className='edit-recipe-name'>Edytuj Przepis</p>
					<Formik initialValues={editRecipe} onSubmit={onSubmit}>
						{({ values, handleChange, handleSubmit, setFieldValue }) => (
							<form className='edit-form' onSubmit={handleSubmit}>
								<EditRecipeInput value={values} onChange={handleChange} />
								<div className='edit-recipe-box'>
									<label>
										<textarea
											placeholder='Opis przepisu'
											className='description-input'
											name='description'
											value={values.description}
											onChange={handleChange}
										/>
									</label>
								</div>
								<br />
								<p className='list-element'>Edytuj Składnik</p>
								{values.ingredients.map((ingredient, index) => {
									return (
										<div className='data-container' key={index}>
											{editIngredientIndex === index ? (
												<div className='data-input'>
													<input
														className='name-input'
														type='text'
														value={ingredient}
														onChange={e =>
															handleIngredientChange(e, index, setFieldValue)
														}
														onBlur={() => setEditIngredientIndex(null)}
													/>
													<button
														className='recipe-button'
														type='button'
														onClick={() => handleEditIngredientClick(index)}>
														Edytuj
													</button>
												</div>
											) : (
												<div className='data-element'>
													<p className='data-text'>{ingredient}</p>
													<button
														className='edit-button'
														type='button'
														onClick={() => handleEditIngredientClick(index)}>
														<FaRegEdit className='edit-icon' />
													</button>
												</div>
											)}
										</div>
									);
								})}
								<p className='list-element'>Edytuj Instrukcję</p>

								{values.instructions.map((instruction, index) => {
									return (
										<div className='data-container' key={index}>
											{editInstructionIndex === index ? (
												<div className='ingredient-instruction-input'>
													<input
														className='name-input'
														type='text'
														value={instruction}
														onChange={e =>
															handleInstructionChange(e, index, setFieldValue)
														}
														onBlur={() => setEditInstructionIndex(null)}
													/>
													<button
														className='recipe-button'
														type='button'
														onClick={() => handleEditInstructionClick(index)}>
														Edytuj
													</button>
												</div>
											) : (
												<div className='data-element'>
													<p className='data-text'>{instruction}</p>
													<button
														className='edit-button'
														type='button'
														onClick={() => handleEditInstructionClick(index)}>
														<FaRegEdit className='edit-icon' />
													</button>
												</div>
											)}
										</div>
									);
								})}
								<button className='submit-button' type='submit'>
									Zapisz
								</button>
							</form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
}

export default EditRecipe;
