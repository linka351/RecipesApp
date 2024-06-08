import { FormikHelpers, useFormik } from "formik";
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

const instructionSchema = yup
	.string()
	.min(5, "Instrukcja musi składać się z co najmniej 5 znaków")
	.required("Pole wymagane");

const ingredientsSchema = yup
	.string()
	.min(2, "długośc nazwy składniku powinna być wieksza niż dwa")
	.required("Pole wymagane");

function AddRecipe() {
	const [instructions, setInstructions] = useState<string[]>([]);
	const [currentInstruction, setCurrentInstruction] = useState<string>("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentIngredient, setCurrentIngredient] = useState<string>("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const addRecipeFormik = useFormik<FormValues>({
		initialValues: {
			recipeName: "",
			recipeDescription: "",
			recipeInstructions: instructions,
			recipeElement: ingredients,
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
			recipeInstructions: yup
				.array()
				.of(instructionSchema)
				.required("Pole wymagane"),
			recipeElement: yup
				.array()
				.of(ingredientsSchema)
				.required("Pole wymagane"),
		}),
		onSubmit: async (values, { resetForm }: FormikHelpers<FormValues>) => {
			try {
				values.recipeInstructions = instructions;
				values.recipeElement = ingredients;
				await addDoc(collection(db, "recipes"), {
					recipeName: values.recipeName,
					recipeDescription: values.recipeDescription,
					recipeInstructions: values.recipeInstructions,
					recipeElement: values.recipeElement,
				});
				resetForm();
				setIngredients([]);
				setInstructions([]);
				setErrors({});
				alert("Dodano przepis " + values.recipeName);
			} catch (e: any) {
				const errors = e.inner
					.map((el: { path: string; message: string }) => ({
						fieldName: el.path,
						message: el.message,
					}))
					.reduce(
						(
							acc: { [key: string]: string },
							current: { fieldName: string; message: string }
						) => ({
							...acc,
							[current.fieldName]: current.message,
						}),
						{}
					);
				setErrors(errors);
			}
		},
	});

	const handleAddInstruction = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		try {
			await instructionSchema.validate(currentInstruction);
			setInstructions([...instructions, currentInstruction]);
			setCurrentInstruction("");
			setErrors(prevErrors => ({ ...prevErrors, currentInstruction: "" }));
		} catch (error: any) {
			setErrors(prevErrors => ({
				...prevErrors,
				currentInstruction: error.message,
			}));
		}
	};
	const handleAddRecipeElement = async (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		try {
			await ingredientsSchema.validate(currentIngredient);
			setIngredients([...ingredients, currentIngredient]);
			setCurrentIngredient("");
			setErrors(prevErrors => ({ ...prevErrors, currentIngredient: "" }));
		} catch (error: any) {
			setErrors(prevErrors => ({
				...prevErrors,
				currentIngredient: error.message,
			}));
		}
	};

	return (
		<div className='add-recipe-container'>
			<h2>Nowy Przepis</h2>
			<form className='add-recipe' onSubmit={addRecipeFormik.handleSubmit}>
				<div className='recipe-box'>
					<input
						className='add-recipe-input'
						type='text'
						placeholder='Nazwa przepisu'
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
				</div>
				<div className='recipe-box'>
					<textarea
						placeholder='Krótki opis przepisu'
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
				</div>
				<label className='add-recipe-label'>Dodaj Instrukcje</label>
				<input
					className='add-recipe-input'
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
				<button className='add-recipe-button' onClick={handleAddInstruction}>
					Add
				</button>
				{errors.currentInstruction && (
					<div className='add-recipe-error'>{errors.currentInstruction}</div>
				)}
				<ul>
					{instructions.map((instruction, index) => (
						<li key={index} className='add-recipe-element'>
							{instruction}
						</li>
					))}
				</ul>
				<label className='add-recipe-label'>Dodaj składnik</label>
				<input
					className='add-recipe-input'
					type='text'
					name='currentIngredient'
					onChange={e => setCurrentIngredient(e.target.value)}
					value={currentIngredient}
				/>
				{addRecipeFormik.touched.recipeElement &&
				addRecipeFormik.errors.recipeElement ? (
					<div className='add-recipe-error'>
						{addRecipeFormik.errors.recipeElement}
					</div>
				) : (
					""
				)}
				<button className='add-recipe-button' onClick={handleAddRecipeElement}>
					Add
				</button>
				{errors.currentIngredient && (
					<div className='add-recipe-error'>{errors.currentIngredient}</div>
				)}
				<ul>
					{ingredients.map((ingredientsEl, index) => (
						<li key={index} className='add-recipe-element'>
							{ingredientsEl}
						</li>
					))}
				</ul>
				<button type='submit' className='add-recipe-submit'>
					Zapisz
				</button>
			</form>
		</div>
	);
}

export default AddRecipe;
