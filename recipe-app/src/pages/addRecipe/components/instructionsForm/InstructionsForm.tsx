import { useFormik } from "formik";
import { instructionSchema } from "../../addRecipe.validation";

import "../addRecipeElementsForm.scss";

type Props = {
	onInstructionsAdded: (instruction: string) => void;
	touched: boolean;
	errors: string | string[];
};

export default function InstructionsForm(props: Props) {
	const { errors, values, touched, handleChange, handleSubmit } = useFormik({
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
			<button
				type='submit'
				className='button'
				disabled={values.instruction === ""}>
				Add
			</button>
			<div className='add-recipe-error'>{props.touched && props.errors}</div>
		</form>
	);
}
