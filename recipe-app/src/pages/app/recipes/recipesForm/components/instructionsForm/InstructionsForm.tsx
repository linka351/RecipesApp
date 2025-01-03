import { useFormik } from "formik";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { instructionSchema } from "../../RecipeForm.validation";

import "../recipesFormComponents.scss";
import { useState } from "react";
import Input from "../../../../../../components/inputs/Input";

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
	const [editInstruction, setEditInstruction] = useState<number | null>(null);

	const formik = useFormik({
		initialValues: {
			instruction: "",
		},
		validationSchema: instructionSchema,
		onSubmit: (values, { resetForm }) => {
			if (editInstruction !== null) {
				onInstructionEdited(editInstruction, values.instruction);
				setEditInstruction(null);
			} else {
				onInstructionsAdded(values.instruction);
			}
			resetForm();
		},
	});

	const handleEditClick = (index: number, ingredient: string) => {
		setEditInstruction(index);
		formik.setFieldValue("instruction", ingredient);
	};

	const handleExitEdit = () => {
		setEditInstruction(null);
		formik.resetForm();
	};

	return (
		<div className='container'>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='instruction' className='label'>
					{editInstruction !== null ? "Edytuj Instrukcję" : "Dodaj Instrukcję"}
				</label>
				<div className='recipe-input'>
					<Input
						className='input'
						type='text'
						name='instruction'
						id='instruction'
						onChange={formik.handleChange}
						value={formik.values.instruction}
					/>
					{formik.touched.instruction && formik.errors.instruction && (
						<div className='error'>{formik.errors.instruction}</div>
					)}
					<div className='button-position'>
						<button
							data-testid='add-instruction'
							type='submit'
							className='button'
							disabled={formik.values.instruction === ""}>
							{editInstruction !== null ? "Zapisz" : "Dodaj"}
						</button>
					</div>
					{editInstruction !== null && (
						<button
							type='button'
							className='button cancel-button'
							onClick={handleExitEdit}>
							Anuluj
						</button>
					)}
				</div>
				<div className='error'>{touched && errors}</div>
			</form>
			<ul className='recipe-list'>
				{instructions.map((instruction, index) => (
					<li key={index} className='recipe-element'>
						{instruction}
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
								onClick={() => handleEditClick(index, instruction)}>
								<FaRegEdit className='edit-element' />
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
