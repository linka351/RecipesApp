import { FormikHelpers, useFormik } from "formik";

import InstructionsForm from "./components/instructionsForm/InstructionsForm";
import IngredientsForm from "./components/ingredientsForm/IngredientsForm";
import Input from "./components/input/Input";
import TextArea from "./components/textArea/TextArea";

import { recipeApi } from "../../api/recipes";
import { validationSchema } from "./addRecipe.validation";

import "./addRecipe.scss";

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
			await recipeApi.add(values);
			resetForm();
			//TODO: Dodać powiadomienia
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

	const handleRemoveElement = (
		index: number,
		element: "instructions" | "ingredients"
	) => {
		const updatedElements = [...formik.values[element]];
		updatedElements.splice(index, 1);
		formik.setFieldValue(element, updatedElements);
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
				onRemove={index => handleRemoveElement(index, "instructions")}
				instructions={formik.values.instructions}
				touched={!!formik.touched.instructions}
				errors={formik.errors.instructions || ""}
			/>
			<IngredientsForm
				onIngredientsAdded={handleAddIngredient}
				onRemove={index => handleRemoveElement(index, "ingredients")}
				ingredients={formik.values.ingredients}
				touched={!!formik.touched.ingredients}
				errors={formik.errors.ingredients || ""}
			/>
			<button className='add-recipe-submit' onClick={formik.submitForm}>
				Zapisz
			</button>
		</div>
	);
}

export default AddRecipe;
