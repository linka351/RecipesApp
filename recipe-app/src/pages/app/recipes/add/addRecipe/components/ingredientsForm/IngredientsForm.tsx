import { useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { ingredientSchema } from "../../addRecipe.validation";
import "../addRecipeElementsForm.scss";

type Props = {
	onIngredientsAdded: (ingredient: string) => void;
	onRemove: (index: number) => void;
	ingredients: string[];
	touched: boolean;
	errors: string | string[];
};

export default function IngredientsForm({
	onIngredientsAdded,
	onRemove,
	ingredients,
	touched,
	errors,
}: Props) {
	const formik = useFormik({
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
					data-testid='add-ingredient'
					type='submit'
					className='button'
					disabled={formik.values.ingredient === ""}>
					Add
				</button>
				<div className='add-recipe-error'>{touched && errors}</div>
			</form>
			<ul>
				{ingredients.map((ingredient, index) => (
					<li key={index} className='add-recipe-element'>
						{ingredient}
						<button
							type='button'
							className='remove-button'
							onClick={() => onRemove(index)}>
							<FaTrashAlt className='remove-element' />
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
