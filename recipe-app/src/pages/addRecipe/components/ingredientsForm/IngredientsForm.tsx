import { useFormik } from "formik";
import { ingredientSchema } from "../../addRecipe.validation";
import { FaTrashAlt } from "react-icons/fa";

import "../addRecipeElementsForm.scss";

type Props = {
	onIngredientsAdded: (ingredient: string) => void;
	touched: boolean;
	errors: string | string[];
};

export default function IngredientsForm(props: Props) {
	const formik = useFormik({
		initialValues: {
			ingredient: "",
			ingredients: [],
		},
		validationSchema: ingredientSchema,
		onSubmit: (values, { resetForm }) => {
			props.onIngredientsAdded(values.ingredient);
			handleAddIngredient(values.ingredient);
			resetForm();
		},
	});

	const handleAddIngredient = (ingredient: string) => {
		formik.setFieldValue("ingredients", [
			...formik.values.ingredients,
			ingredient,
		]); // Ustawiamy wartość listy składników w formik
		formik.resetForm(); // Resetujemy formularz po dodaniu składnika
	};

	const handleRemoveIngredient = (index: number) => {
		const newIngredients = [...formik.values.ingredients];
		newIngredients.splice(index, 1);
		formik.setFieldValue("ingredients", newIngredients); // Ustawiamy wartość listy składników w formik
	};

	return (
		<>
			<form className='instruction-box' onSubmit={formik.handleSubmit}>
				<label htmlFor='ingredient' className='label'>
					Dodaj Składnik
				</label>
				<input
					className='input'
					type='text'
					name='ingredient'
					id='ingredient'
					onChange={formik.handleChange}
					value={formik.values.ingredient}
				/>
				{formik.touched.ingredient && formik.errors.ingredient && (
					<div className='error'>{formik.errors.ingredient}</div>
				)}
				<button
					type='submit'
					className={"button"}
					disabled={formik.values.ingredient === ""}
					onClick={formik.submitForm}>
					Add
				</button>
				<div className='add-recipe-error'>{props.touched && props.errors}</div>
				<ul>
					{formik.values.ingredients.map((ingredient, index) => (
						<li key={index} className='add-recipe-element'>
							{ingredient}
							<button
								className='remove-button'
								onClick={() => handleRemoveIngredient(index)}>
								<FaTrashAlt className='remove-element' />
							</button>
						</li>
					))}
				</ul>
			</form>
		</>
	);
}
