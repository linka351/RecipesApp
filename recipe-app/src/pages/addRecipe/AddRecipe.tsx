import { useFormik } from "formik";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import * as yup from "yup";

import "./addRecipe.scss";
import { useState } from "react";

interface FormValues {
	recipeName: string;
	recipeDescription: string;
	recipeInstructions: string[];
	recipeElement: string[];
}

function AddRecipe() {
	const [instructions, setInstructions] = useState<string[]>([]);
	const [currentInstruction, setCurrentInstruction] = useState<string>("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentIngredient, setCurrentIngredient] = useState<string>("");

	const addRecipeFormik = useFormik<FormValues>({
		initialValues: {
			recipeName: "",
			recipeDescription: "",
			recipeInstructions: [],
			recipeElement: [],
		},
		validationSchema: yup.object().shape({
			recipeName: yup
				.string()
				.required("Pole wymagane")
				.min(3, "Pole dłuzsze niż 3 znaki"),
			recipeDescription: yup
				.string()
				.required("Pole wymagane")
				.min(5, "Opis musi składać się z więcej niż 5 liter"),
		}),
		onSubmit: async values => {
			try {
				values.recipeInstructions = instructions;
				values.recipeElement = ingredients;
				await addDoc(collection(db, "recipes"), {
					recipeName: values.recipeName,
					recipeDescription: values.recipeDescription,
					recipeInstructions: values.recipeInstructions,
					recipeElement: values.recipeElement,
				});
				alert("Dodano przepis " + values.recipeName);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		},
	});

	const handleAddInstruction = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (currentInstruction.trim() !== "") {
			setInstructions([...instructions, currentInstruction]);
			setCurrentInstruction("");
		}
	};
	const handleAddRecipeElement = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (currentIngredient.trim() !== "") {
			setIngredients([...ingredients, currentIngredient]);
			setCurrentIngredient("");
		}
	};

	return (
		<div className='add-recipe-container'>
			<h2>Nowy Przepis</h2>
			<form className='add-recipe' onSubmit={addRecipeFormik.handleSubmit}>
				<label className='add-recipe-text'>Recipe Name</label>
				<input
					className='recipe-name'
					type='text'
					placeholder='nazwa przepisu'
					name='recipeName'
					onChange={addRecipeFormik.handleChange}
					value={addRecipeFormik.values.recipeName}
				/>
				{addRecipeFormik.touched.recipeName &&
				addRecipeFormik.errors.recipeName ? (
					<div className='add-recipe-error'>
						{addRecipeFormik.errors.recipeName}
					</div>
				) : (
					""
				)}
				<label className='add-recipe-text'>Recipe Description</label>
				<textarea
					placeholder='krótki opis przepisu'
					className='recipe-description'
					name='recipeDescription'
					onChange={addRecipeFormik.handleChange}
					value={addRecipeFormik.values.recipeDescription}></textarea>
				{addRecipeFormik.touched.recipeDescription &&
				addRecipeFormik.errors.recipeDescription ? (
					<div className='add-recipe-error'>
						{addRecipeFormik.errors.recipeDescription}
					</div>
				) : (
					""
				)}
				<label>Instrukcje</label>
				<input
					type='text'
					name='currentInstruction'
					onChange={e => setCurrentInstruction(e.target.value)}
					value={currentInstruction}
				/>
				{addRecipeFormik.touched.recipeInstructions &&
				addRecipeFormik.errors.recipeInstructions ? (
					<div className='add-recipe-error'>
						{addRecipeFormik.errors.recipeInstructions}
					</div>
				) : (
					""
				)}
				<button onClick={handleAddInstruction}>Add</button>
				<ul>
					{instructions.map((instruction, index) => (
						<li key={index}>{instruction}</li>
					))}
				</ul>
				<label>Dodaj składnik</label>
				<input
					type='text'
					name='currentIngredient'
					onChange={e => setCurrentIngredient(e.target.value)}
					value={currentIngredient}
				/>
				<button onClick={handleAddRecipeElement}>Add</button>
				<ul>
					{ingredients.map((ingredientsEl, index) => (
						<li key={index}>{ingredientsEl}</li>
					))}
				</ul>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default AddRecipe;
