import { FormikHelpers, useFormik } from "formik";
import InstructionsForm from "./components/instructionsForm/InstructionsForm";
import IngredientsForm from "./components/ingredientsForm/IngredientsForm";
import Input from "../../../../components/inputs/Input";
import TextArea from "../../../../components/textAreas/TextArea";
import { recipeApi } from "../../../../api/recipes";
import { validationSchema } from "./RecipeForm.validation";
import { Oval } from "react-loader-spinner";

import "./recipesForm.scss";
import Button from "../../../../components/buttons/Button";
import { useEffect, useRef, useState } from "react";
import ImageUploader from "./components/uploadImage/ImageUploader";
import { IoCloudUploadOutline } from "react-icons/io5";

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

function RecipesForm({ initialValues, onSubmit }: RecipesFormProps) {
	const [imageUpload, setImageUpload] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const imageUploaderRef = useRef<{ clear: () => void } | null>(null);

	useEffect(() => {
		if (initialValues?.image) {
			setPreviewImage(initialValues.image);
		}
	}, [initialValues]);

	const defaultValues: FormValues = {
		name: "",
		description: "",
		instructions: [],
		ingredients: [],
		image: "",
	};

	const uploadImage = async (file: File): Promise<string | undefined> => {
		try {
			const formData = new FormData();
			formData.append("image", file);

			const response = await fetch(
				"https://api.imgbb.com/1/upload?key=b3ac6f5037e59ed8c19ca6407f24f2b5",
				{
					method: "POST",
					body: formData,
				}
			);

			const data = await response.json();
			if (!data.success) {
				throw new Error("Błąd podczas przesyłania zdjęcia");
			}
			return data.data.display_url;
		} catch (error) {
			console.error("Błąd podczas przesyłania zdjęcia:", error);
		}
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
			setIsSubmitting(true);
			let imageUrl = values.image;
			if (imageUpload) {
				const uploadedImageUrl = await uploadImage(imageUpload);
				if (uploadedImageUrl) {
					imageUrl = uploadedImageUrl;
				}
			}

			if (values.id) {
				await recipeApi.update(values.id, {
					...values,
					image: imageUrl,
				});
			} else {
				await recipeApi.add({
					...values,
					image: imageUrl,
				});
			}

			formikHelpers.resetForm();
			setPreviewImage(null);
			setImageUpload(null);
			if (imageUploaderRef.current) {
				imageUploaderRef.current.clear();
			}
			if (onSubmit) onSubmit();
		} catch (error) {
			console.error("Błąd podczas zapisywania przepisu:", error);
		} finally {
			setIsSubmitting(false);
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageUpload(file);
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	return (
		<div className='recipe-container'>
			{isSubmitting && (
				<div className='full-page-loader'>
					<Oval
						height={100}
						width={100}
						color='#ffffff'
						ariaLabel='Zapisywanie przepisu'
						secondaryColor='#ffffff'
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				</div>
			)}
			<div className='recipe-form-name'>
				<p className='new-recipe'>
					{initialValues?.id ? "Edytuj Przepis" : "Nowy Przepis"}
				</p>
			</div>
			<div className='elements-layout'>
				<form className='recipe' onSubmit={formik.handleSubmit}>
					<Input
						placeholder='Nazwa przepisu'
						name='name'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						touched={formik.touched.name}
						value={formik.values.name}
						error={formik.errors.name || ""}
						inputClassName='recipe-form-input'
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
				<div className='image-container'>
					<div className='image-preview'>
						{previewImage ? (
							<div>
								<img
									className='image'
									src={previewImage}
									alt='Podgląd zdjęcia'
								/>
							</div>
						) : (
							<div className='file-upload'>
								<div className='cloud-upload'>
									<IoCloudUploadOutline />
								</div>
							</div>
						)}
						<ImageUploader ref={imageUploaderRef} onChange={handleFileChange} />
					</div>
				</div>
			</div>

			<div className='position-elements'>
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
			<Button
				className='recipe-submit'
				type='button'
				onClick={formik.submitForm}>
				Zapisz
			</Button>
		</div>
	);
}

export default RecipesForm;
