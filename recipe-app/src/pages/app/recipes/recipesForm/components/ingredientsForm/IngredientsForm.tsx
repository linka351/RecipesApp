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
		<div className='container'>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='ingredient' className='label'>
					{editIngredient !== null ? "Edytuj Składnik" : "Dodaj Składnik"}
				</label>
				<div className='recipe-input'>
					<Input
						inputClassName='input'
						type='text'
						name='ingredient'
						id='ingredient'
						onChange={formik.handleChange}
						value={formik.values.ingredient}
					/>
					{formik.touched.ingredient && formik.errors.ingredient && (
						<div className='error'>{formik.errors.ingredient}</div>
					)}
					<div className='button-position'>
						<Button
							data-testid='add-ingredient'
							type='submit'
							className='button'
							disabled={formik.values.ingredient === ""}>
							{editIngredient !== null ? "Zapisz" : "Dodaj"}
						</Button>
					</div>
					{editIngredient !== null && (
						<Button
							type='button'
							className='button cancel-button'
							onClick={handleExitEdit}>
							Anuluj
						</Button>
					)}
				</div>
				<div className='error'>{touched && errors}</div>
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
