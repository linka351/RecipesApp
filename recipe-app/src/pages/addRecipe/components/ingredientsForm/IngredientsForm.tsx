import { useFormik } from "formik";
import { ingredientSchema } from "../../addRecipe.validation";

import "../addRecipeElementsForm.scss";

type Props = {
	onIngredientsAdded: (ingredient: string) => void;
};

export default function IngredientsForm({ onIngredientsAdded }: Props) {
	const { errors, values, touched, handleChange, handleSubmit } = useFormik({
		initialValues: {
			ingredient: "",
		},
		validationSchema: ingredientSchema,
		onSubmit: (values, { resetForm }) => {
			onIngredientsAdded(values.ingredient);
			resetForm();
		},
	});

	return (
		<form className='instruction-box' onSubmit={handleSubmit}>
			<label htmlFor='ingredient' className='label'>
				Dodaj Składnik
			</label>
			<input
				className='input'
				type='text'
				name='ingredient'
				id='ingredient'
				onChange={handleChange}
				value={values.ingredient}
			/>
			{touched.ingredient && errors.ingredient && (
				<div className='error'>{errors.ingredient}</div>
			)}
			<button type='submit' className='button'>
				Add
			</button>
		</form>
	);
}
