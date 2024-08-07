import { useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { ingredientSchema } from "../../addRecipe.validation";
import "../addRecipeElementsForm.scss";
import { useState } from "react";

type Props = {
	onIngredientsAdded: (ingredient: string) => void;
	onIngredientEdited: (index: number, ingredient: string) => void;
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
	onIngredientEdited,
}: Props) {
	const [editIngredient, setEditIngredient] = useState<number | null>(null);

	const formik = useFormik({
		initialValues: {
			ingredient: "",
		},
		validationSchema: ingredientSchema,
		onSubmit: (values, { resetForm }) => {
			if (editIngredient !== null) {
				onIngredientEdited(editIngredient, values.ingredient);
				setEditIngredient(null);
			} else {
				onIngredientsAdded(values.ingredient);
			}
			resetForm();
		},
	});

	const handleEditClick = (index: number, ingredient: string) => {
		setEditIngredient(index);
		formik.setFieldValue("ingredient", ingredient);
	};

	const handleExitEdit = () => {
		setEditIngredient(null);
		formik.resetForm();
	};

	return (
		<>
			<form className='instruction-box' onSubmit={formik.handleSubmit}>
				<label htmlFor='ingredient' className='label'>
					{editIngredient !== null ? "Edytuj Składnik" : "Dodaj Składnik"}
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
					{editIngredient !== null ? "Zapisz" : "Dodaj"}
				</button>
				{editIngredient !== null && (
					<button
						type='button'
						className='button cancel-button'
						onClick={handleExitEdit}>
						Anuluj
					</button>
				)}
				<div className='add-recipe-error'>{touched && errors}</div>
			</form>
			<ul>
				{ingredients.map((ingredient, index) => (
					<li key={index} className='add-recipe-element'>
						{ingredient}
						<div className='buttons'>
							<button
								type='button'
								className='remove-button'
								onClick={() => onRemove(index)}>
								<FaTrashAlt className='remove-element' />
							</button>
							<button
								type='button'
								className='edit-button'
								onClick={() => handleEditClick(index, ingredient)}>
								<FaRegEdit className='edit-element' />
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
