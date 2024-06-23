import { useFormik } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import { instructionSchema } from "../../addRecipe.validation";

import "../addRecipeElementsForm.scss";

type Props = {
	onInstructionsAdded: (instruction: string) => void;
	onRemove: (index: number) => void;
	instructions: string[];
	touched: boolean;
	errors: string | string[];
};

export default function InstructionsForm(props: Props) {
	const formik = useFormik({
		initialValues: {
			instruction: "",
		},
		validationSchema: instructionSchema,
		onSubmit: (values, { resetForm }) => {
			props.onInstructionsAdded(values.instruction);
			resetForm();
		},
	});

	return (
		<>
			<form className='instruction-box' onSubmit={formik.handleSubmit}>
				<label htmlFor='instruction' className='label'>
					Dodaj Instrukcje
				</label>
				<input
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
				<button
					type='submit'
					className='button'
					disabled={formik.values.instruction === ""}>
					Add
				</button>
				<div className='add-recipe-error'>{props.touched && props.errors}</div>
			</form>
			<ul>
				{props.instructions.map((instruction, index) => (
					<li key={index} className='add-recipe-element'>
						{instruction}
						<button
							type='button'
							className='remove-button'
							onClick={() => props.onRemove(index)}>
							<FaTrashAlt className='remove-element' />
						</button>
					</li>
				))}
			</ul>
		</>
	);
}
