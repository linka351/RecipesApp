import { FormikHelpers, useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";

import InstructionsForm from "./components/instructionsForm/InstructionsForm";
import IngredientsForm from "./components/ingredientsForm/IngredientsForm";

import { recipeApi } from "../../api/recipes";
import { validationSchema } from "./addRecipe.validation";

import "./addRecipe.scss";
import Input from "./components/input/Input";
import TextArea from "./components/textArea/TextArea";

export interface FormValues {
	name: string;
	description: string;
	instructions: string[];
	ingredients: string[];
}

const initialValues: FormValues = {
	name: "",
	description: "",
	instructions: [],
	ingredients: [],
};

function AddRecipe() {
	const formik = useFormik<FormValues>({
		initialValues,
		validationSchema,
		onSubmit,
	});

	async function onSubmit(
		values: FormValues,
		{ resetForm }: FormikHelpers<FormValues>
	) {
		try {
			alert(JSON.stringify(values));
			await recipeApi.add(values);
			resetForm();
			alert("Dodano przepis " + values.name);
		} catch (e: any) {
			console.log({ e });
		}
	}

	const handleAddInstruction = (instruction: string) => {
		formik.setFieldValue("instructions", [
			...formik.values.instructions,
			instruction,
		]);
	};

	const handleAddIngredient = (ingredient: string) => {
		formik.setFieldValue("ingredients", [
			...formik.values.ingredients,
			ingredient,
		]);
	};

	const handleRemoveElement = (index: number, element: keyof FormValues) => {
		const updatedElement = [...formik.values[element]];
		updatedElement.splice(index, 1);
		formik.setFieldValue(element, updatedElement);
	};

	return (
		<div className='add-recipe-container'>
			<h2>Nowy Przepis</h2>
			<form className='add-recipe' onSubmit={formik.handleSubmit}>
				<Input
					placeholder='Nazwa przepisu'
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={!!formik.touched.name}
					errors={formik.errors.name || ""}
				/>
				<TextArea
					placeholder='Krótki opis przepisu'
					name='description'
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={!!formik.touched.description}
					errors={formik.errors.description || ""}
				/>
			</form>
			<InstructionsForm
				onInstructionsAdded={handleAddInstruction}
				touched={!!formik.touched.instructions}
				errors={formik.errors.instructions || ""}
			/>
			<ul>
				{formik.values.instructions.map((instruction, index) => (
					<li key={index} className='add-recipe-element'>
						{instruction}
						<button
							className='remove-button'
							onClick={() => handleRemoveElement(index, "instructions")}>
							<FaTrashAlt className='remove-element' />
						</button>
					</li>
				))}
			</ul>
			<IngredientsForm
				onIngredientsAdded={handleAddIngredient}
				touched={!!formik.touched.ingredients}
				errors={formik.errors.ingredients || ""}
			/>
			<ul>
				{formik.values.ingredients.map((ingredient, index) => (
					<li key={index} className='add-recipe-element'>
						{ingredient}
						<button
							className='remove-button'
							onClick={() => handleRemoveElement(index, "ingredients")}>
							<FaTrashAlt className='remove-element' />
						</button>
					</li>
				))}
			</ul>

			<button className='add-recipe-submit' onClick={formik.submitForm}>
				Zapisz
			</button>
		</div>
	);
}

export default AddRecipe;
