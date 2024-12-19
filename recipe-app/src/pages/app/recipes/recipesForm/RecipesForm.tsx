import { FormikHelpers, useFormik } from "formik";
import InstructionsForm from "./components/instructionsForm/InstructionsForm";
import IngredientsForm from "./components/ingredientsForm/IngredientsForm";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";
import { recipeApi } from "../../../../api/recipes";
import { validationSchema } from "./RecipeForm.validation";

import "./recipesForm.scss";
import Button from "../../../../components/buttons/Button";

export interface FormValues {
	id?: string;
	name: string;
	description: string;
	instructions: string[];
	ingredients: string[];
}

interface RecipesFormProps {
	initialValues?: FormValues;
	onSubmit?: () => void;
}

function RecipesForm({ initialValues, onSubmit }: RecipesFormProps) {
	const defaultValues: FormValues = {
		name: "",
		description: "",
		instructions: [],
		ingredients: [],
	};

	const formik = useFormik<FormValues>({
		initialValues: initialValues || defaultValues,
		validationSchema,
		onSubmit: handleSubmit,
	});

	async function handleSubmit(
		values: FormValues,
		formikHelpers: FormikHelpers<FormValues>
	) {
		try {
			if (values.id) {
				await recipeApi.update(values.id!, {
					name: values.name,
					description: values.description,
					instructions: values.instructions,
					ingredients: values.ingredients,
				});
			} else {
				await recipeApi.add(values);
			}
			formikHelpers.resetForm();
			if (onSubmit) onSubmit();
		} catch (e: any) {
			alert(`wystąpił bład: ${e.message}`);
		}
	}

	const handleAddInstruction = (instruction: string): void => {
		formik.setFieldValue("instructions", [
			...formik.values.instructions,
			instruction,
		]);
	};

	const handleAddIngredient = (ingredient: string): void => {
		formik.setFieldValue("ingredients", [
			...formik.values.ingredients,
			ingredient,
		]);
	};

	const handleRemoveElement = (
		index: number,
		element: "instructions" | "ingredients"
	): void => {
		const updatedElements = [...formik.values[element]];
		updatedElements.splice(index, 1);
		formik.setFieldValue(element, updatedElements);
	};

	const handleEditIngredient = (index: number, ingredient: string) => {
		const updatedIngredients = [...formik.values.ingredients];
		updatedIngredients[index] = ingredient;
		formik.setFieldValue("ingredients", updatedIngredients);
	};
	const handleEditInstruction = (index: number, instruction: string) => {
		const updatedInstructions = [...formik.values.instructions];
		updatedInstructions[index] = instruction;
		formik.setFieldValue("instructions", updatedInstructions);
	};

	return (
		<div className='recipe-container'>
			<div className='recipe-form-name'>
				<h2 className='new-recipe'>
					{initialValues?.id ? "Edytuj Przepis" : "Nowy Przepis"}
				</h2>

				<Button
					className='recipe-submit'
					type='button'
					onClick={formik.submitForm}>
					Zapisz
				</Button>
			</div>
			<form className='recipe' onSubmit={formik.handleSubmit}>
				<Input
					placeholder='Nazwa przepisu'
					name='name'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					touched={formik.touched.name}
					value={formik.values.name}
					error={formik.errors.name || ""}
				/>
				<TextArea
					textAreaClassName='recipe-textarea'
					placeholder='Opis przepisu'
					name='description'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					touched={formik.touched.description}
					value={formik.values.description}
					error={formik.errors.description || ""}
				/>
			</form>
			<div className='row'>
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
			</div>
		</div>
	);
}

export default RecipesForm;
