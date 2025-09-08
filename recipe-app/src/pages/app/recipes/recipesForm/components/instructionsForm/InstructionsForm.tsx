import { useFormik } from "formik";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { instructionSchema } from "../../RecipeForm.validation";

import "../recipesFormComponents.scss";
import { useState } from "react";
import Input from "../../../../../../components/inputs/Input";
import Button from "../../../../../../components/buttons/Button";

type Props = {
	onInstructionsAdded: (instruction: string) => void;
	onInstructionEdited: (Index: number, instruction: string) => void;
	onRemove: (index: number) => void;
	instructions: string[];
	touched: boolean;
	errors: string | string[];
};

export default function InstructionsForm({
	onInstructionsAdded,
	onInstructionEdited,
	onRemove,
	instructions,
	touched,
	errors,
}: Props) {
	const [isEditMode, setIsEditMode] = useState<number | null>(null);

	const formik = useFormik({
		initialValues: {
			instruction: "",
		},
		validationSchema: instructionSchema,
		onSubmit: (values, { resetForm }) => {
			if (isEditMode !== null) {
				onInstructionEdited(isEditMode, values.instruction);
				setIsEditMode(null);
			} else {
				onInstructionsAdded(values.instruction);
			}
			resetForm();
		},
	});

	const handleEditClick = (index: number, ingredient: string) => {
		setIsEditMode(index);
		formik.setFieldValue("instruction", ingredient);
	};

	const handleExitEdit = () => {
		setIsEditMode(null);
		formik.resetForm();
	};

	return (
		<div className='recipe-details-container'>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='instruction' className='recipes-form-label'>
					{isEditMode !== null ? "Edytuj Instrukcję" : "Dodaj Instrukcję"}
				</label>
				<div className='recipe-components-input'>
					<Input
						inputClassName='input'
						type='text'
						name='instruction'
						id='instruction'
						onChange={formik.handleChange}
						value={formik.values.instruction}
					/>
					<div className='buttons-container'>
						<div className='button-position'>
							<Button
								data-testid='add-instruction'
								type='submit'
								disabled={formik.values.instruction === ""}>
								{isEditMode !== null ? "Zapisz" : "Dodaj"}
							</Button>
							{isEditMode !== null && (
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
					{formik.touched.instruction && formik.errors.instruction && (
						<div className='common-recipe-error'>
							{formik.errors.instruction}
						</div>
					)}
					<div className='common-recipe-error'>{touched && errors}</div>
				</div>
			</form>
			<ul className='recipe-list'>
				{instructions.map((instruction, index) => (
					<li key={index} className='recipe-element'>
						{instruction}
						<div className='buttons'>
							<Button
								type='button'
								className={
									isEditMode !== null ? "disabled-button" : "remove-button"
								}
								disabled={isEditMode !== null}
								onClick={() => onRemove(index)}>
								<FaTrashAlt className='remove-element' />
							</Button>

							<Button
								type='button'
								className='edit-button'
								onClick={() => handleEditClick(index, instruction)}>
								<FaRegEdit className='edit-element' />
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
