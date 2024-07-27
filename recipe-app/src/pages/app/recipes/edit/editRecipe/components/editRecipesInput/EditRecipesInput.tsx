import { Recipe } from "../../../../../../../types/editRecipe";

interface EditRecipeInputProps {
	value: Recipe;
	onChange: (values: Recipe) => void;
}

function EditRecipeInput({ value, onChange }: EditRecipeInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: inputValue } = e.target;
		onChange({
			...value,
			[name]: inputValue,
		});
	};

	return (
		<>
			<div className='edit-recipe-box'>
				<label>
					<input
						className='name-input'
						placeholder='Nazwa przepisu'
						type='text'
						name='name'
						value={value.name}
						onChange={handleChange}
					/>
				</label>
			</div>
		</>
	);
}

export default EditRecipeInput;
