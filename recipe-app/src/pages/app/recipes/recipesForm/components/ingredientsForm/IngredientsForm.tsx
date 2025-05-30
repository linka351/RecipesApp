import { useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { ingredientSchema } from "../../RecipeForm.validation";
import "../recipesFormComponents.scss";
import { useState } from "react";
import Input from "../../../../../../components/inputs/Input";
import Button from "../../../../../../components/buttons/Button";

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
		<div className='recipe-details-container'>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='ingredient' className='recipes-form-label'>
					{editIngredient !== null ? "Edytuj Składnik" : "Dodaj Składnik"}
				</label>
				<div className='recipe-components-input'>
					<Input
						inputClassName='input'
						type='text'
						name='ingredient'
						id='ingredient'
						onChange={formik.handleChange}
						value={formik.values.ingredient}
					/>
					<div className='buttons-container'>
						<div className='button-position'>
							<Button
								data-testid='add-ingredient'
								type='submit'
								disabled={formik.values.ingredient === ""}>
								{editIngredient !== null ? "Zapisz" : "Dodaj"}
							</Button>
							{editIngredient !== null && (
								<Button
									type='button'
									className='cancel-button'
									onClick={handleExitEdit}>
									Anuluj
								</Button>
							)}
						</div>
					</div>
				</div>
				<div className='common-error-container'>
					{formik.touched.ingredient && formik.errors.ingredient && (
						<div className='common-recipe-error'>
							{formik.errors.ingredient}
						</div>
					)}
					<div className='common-recipe-error'>{touched && errors}</div>
				</div>
			</form>
			<ul className='recipe-list'>
				{ingredients.map((ingredient, index) => (
					<li key={index} className='recipe-element'>
						{ingredient}
						<div className='buttons'>
							<Button
								type='button'
								className='remove-button'
								onClick={() => onRemove(index)}>
								<FaTrashAlt className='remove-element' />
							</Button>
							<Button
								type='button'
								className='edit-button'
								onClick={() => handleEditClick(index, ingredient)}>
								<FaRegEdit className='edit-element' />
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
