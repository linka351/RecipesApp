// import { FormikHelpers, useFormik } from "formik";
// import InstructionsForm from "./components/instructionsForm/InstructionsForm";
// import IngredientsForm from "./components/ingredientsForm/IngredientsForm";
import Input from "../../../../components/inputs/Input";
// import TextArea from "../../../../components/textAreas/TextArea";
// import { recipeApi } from "../../../../api/recipes";
// import { validationSchema } from "./RecipeForm.validation";
import "./recipesForm.scss";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";

export interface FormValues {
	id?: string;
	name: string;
	description: string;
	instructions: string[];
	ingredients: string[];
	image?: string;
}

interface RecipesFormProps {
	initialValues?: FormValues;
	onSubmit?: () => void;
}

function RecipesForm({}: RecipesFormProps) {
	const [imageUpload, setImageUpload] = useState<File | null>(null);

	const uploadImage = async () => {
		if (!imageUpload) {
			alert("Najpierw wybierz zdjęcie!");
			return;
		}

		const imageRef = ref(storage, `images/${imageUpload.name}`);

		try {
			await uploadBytes(imageRef, imageUpload);

			const downloadURL = await getDownloadURL(imageRef);

			alert("Zdjęcie zostało dodane!");
			console.log("Download URL:", downloadURL);
		} catch (error) {
			console.error("Błąd podczas przesyłania zdjęcia:", error);
			alert("Wystąpił problem z przesłaniem zdjęcia. Spróbuj ponownie.");
		}
	};

	// const defaultValues: FormValues = {
	// 	name: "",
	// 	description: "",
	// 	instructions: [],
	// 	ingredients: [],
	// };

	// const formik = useFormik<FormValues>({
	// 	initialValues: initialValues || defaultValues,
	// 	validationSchema,
	// 	onSubmit: handleSubmit,
	// });

	// async function handleSubmit(
	// 	values: FormValues,
	// 	formikHelpers: FormikHelpers<FormValues>
	// ) {
	// 	try {
	// 		if (values.id) {
	// 			await recipeApi.update(values.id!, {
	// 				name: values.name,
	// 				description: values.description,
	// 				instructions: values.instructions,
	// 				ingredients: values.ingredients,
	// 				image: imageUrl,
	// 			});
	// 		} else {
	// 			await recipeApi.add(values);
	// 		}
	// 		formikHelpers.resetForm();
	// 		if (onSubmit) onSubmit();
	// 	} catch (e: any) {
	// 		console.log({ e });
	// 	}
	// }

	// const handleAddInstruction = (instruction: string): void => {
	// 	formik.setFieldValue("instructions", [
	// 		...formik.values.instructions,
	// 		instruction,
	// 	]);
	// };

	// const handleAddIngredient = (ingredient: string): void => {
	// 	formik.setFieldValue("ingredients", [
	// 		...formik.values.ingredients,
	// 		ingredient,
	// 	]);
	// };

	// const handleRemoveElement = (
	// 	index: number,
	// 	element: "instructions" | "ingredients"
	// ): void => {
	// 	const updatedElements = [...formik.values[element]];
	// 	updatedElements.splice(index, 1);
	// 	formik.setFieldValue(element, updatedElements);
	// };

	// const handleEditIngredient = (index: number, ingredient: string) => {
	// 	const updatedIngredients = [...formik.values.ingredients];
	// 	updatedIngredients[index] = ingredient;
	// 	formik.setFieldValue("ingredients", updatedIngredients);
	// };
	// const handleEditInstruction = (index: number, instruction: string) => {
	// 	const updatedInstructions = [...formik.values.instructions];
	// 	updatedInstructions[index] = instruction;
	// 	formik.setFieldValue("instructions", updatedInstructions);
	// };

	// const handleFileUpload = (
	// 	event: React.ChangeEvent<HTMLInputElement>
	// ): void => {
	// 	const file = event.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();

	// 		reader.onload = (e: ProgressEvent<FileReader>) => {
	// 			if (e.target?.result) {
	// 				setImageUrl(e.target.result as string);
	// 			}
	// 		};

	// 		reader.readAsDataURL(file);
	// 	}
	// };

	return (
		<div className='recipe-container'>
			<Input
				type='file'
				name='image'
				onChange={e => {
					const file = e.target.files?.[0];
					if (file) {
						setImageUpload(file);
						console.log("Wybrano plik:", file.name);
					}
				}}
			/>
			<button onClick={uploadImage}>Upload</button>
			{/* {imageUrl && (
				<img
					style={{ height: "200px", width: "200px" }}
					src={imageUrl}
					alt='Uploaded preview'
				/>
			)} */}
			{/* <div className='recipe-name'>
				<h2>{initialValues?.id ? "Edytuj Przepis" : "Nowy Przepis"}</h2>

				<button
					className='recipe-submit'
					type='button'
					onClick={formik.submitForm}>
					Zapisz
				</button>
			</div>
			<form className='recipe' onSubmit={formik.handleSubmit}>
				<Input
					name='name'
					onChange={formik.handleChange}
					value={formik.values.name}
					error={formik.errors.name || ""}
				/>
				<TextArea
					name='description'
					onChange={formik.handleChange}
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
			</div> */}
		</div>
	);
}

export default RecipesForm;
