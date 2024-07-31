import { FormikHelpers, useFormik } from "formik";
import InstructionsForm from "./components/instructionsForm/InstructionsForm";
import IngredientsForm from "./components/ingredientsForm/IngredientsForm";
import Input from "./components/input/Input";
import TextArea from "./components/textArea/TextArea";
import { recipeApi } from "../../../../api/recipes";
import { validationSchema } from "./addRecipe.validation";
import "../add/addRecipe/addRecipe.scss";

export interface FormValues {
	id?: string;
	name: string;
	description: string;
	instructions: string[];
	ingredients: string[];
}

interface RecipesFormProps {
	initialValues?: FormValues;
	onSubmitSuccess?: () => void;
}

function RecipesForm({ initialValues, onSubmitSuccess }: RecipesFormProps) {
	const defaultValues: FormValues = {
		name: "",
		description: "",
		instructions: [],
		ingredients: [],
	};

	const formik = useFormik<FormValues>({
		initialValues: initialValues || defaultValues,
		validationSchema,
		onSubmit,
	});

	async function onSubmit(
		values: FormValues,
		{ resetForm }: FormikHelpers<FormValues>
	) {
		try {
			if (values.id) {
				await recipeApi.update(values.id, {
					name: values.name,
					description: values.description,
					instructions: values.instructions,
					ingredients: values.ingredients,
				});
			} else {
				await recipeApi.add(values);
			}
			resetForm();
			if (onSubmitSuccess) onSubmitSuccess();
		} catch (e: any) {
			console.log({ e });
		}
	}

	function handleAddInstruction(instruction: string) {
		formik.setFieldValue("instructions", [
			...formik.values.instructions,
			instruction,
		]);
	}

	function handleAddIngredient(ingredient: string) {
		formik.setFieldValue("ingredients", [
			...formik.values.ingredients,
			ingredient,
		]);
	}

	function handleRemoveElement(
		index: number,
		element: "instructions" | "ingredients"
	) {
		const updatedElements = [...formik.values[element]];
		updatedElements.splice(index, 1);
		formik.setFieldValue(element, updatedElements);
	}

	const handleEditIngredient = (index: number, ingredient: string) => {
		const updatedIngredients = [...formik.values.ingredients];
		updatedIngredients[index] = ingredient;
		formik.setFieldValue("ingredients", updatedIngredients);
	};
	const handleEditInstruction = (index: number, ingredient: string) => {
		const updatedInstructions = [...formik.values.instructions];
		updatedInstructions[index] = ingredient;
		formik.setFieldValue("ingredients", updatedInstructions);
	};

	return (
		<div className='add-recipe-container'>
			<h2>{initialValues?.id ? "Edytuj Przepis" : "Nowy Przepis"}</h2>
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
				onInstructionEdited={handleEditInstruction}
				onRemove={index => handleRemoveElement(index, "instructions")}
				instructions={formik.values.instructions}
				touched={!!formik.touched.instructions}
				errors={formik.errors.instructions || ""}
			/>
			<IngredientsForm
				onIngredientsAdded={handleAddIngredient}
				onIngredientEdited={handleEditIngredient}
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

export default RecipesForm;
