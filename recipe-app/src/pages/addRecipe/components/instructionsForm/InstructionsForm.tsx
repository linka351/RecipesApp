import { useFormik } from "formik";
import { instructionSchema } from "../../addRecipe.validation";

import "../addRecipeElementsForm.scss";

type Props = {
	onInstructionsAdded: (instruction: string) => void;
};

export default function InstructionsForm({ onInstructionsAdded }: Props) {
	const { errors, values, touched, handleChange, handleSubmit } = useFormik({
		initialValues: {
			instruction: "",
		},
		validationSchema: instructionSchema,
		onSubmit: (values, { resetForm }) => {
			onInstructionsAdded(values.instruction);
			resetForm();
		},
	});

	return (
		<form className='instruction-box' onSubmit={handleSubmit}>
			<label htmlFor='instruction' className='label'>
				Dodaj Instrukcje
			</label>
			<input
				className='input'
				type='text'
				name='instruction'
				id='instruction'
				onChange={handleChange}
				value={values.instruction}
			/>
			{touched.instruction && errors.instruction && (
				<div className='error'>{errors.instruction}</div>
			)}
			<button type='submit' className='button'>
				Add
			</button>
		</form>
	);
}
