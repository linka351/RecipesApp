import React, { useState } from "react";
import * as yup from "yup";
import Input from "../../../../../../../components/inputs/Input";
import { newMealNameValidationSchema } from "../../../../mealPlansForm/MealPlansForm.validation";

type NewMealNameInputProps = {
	onAdd: (mealName: string) => void;
};

const NewMealNameInput: React.FC<NewMealNameInputProps> = ({ onAdd }) => {
	const [newMealName, setNewMealName] = useState("");
	const [error, setError] = useState<string>("");
	const [touched, setTouched] = useState(false);

	const handleBlur = () => {
		setTouched(true);
		try {
			newMealNameValidationSchema.validateSync({ newMealName });
			setError("");
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				setError(err.message);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMealName(e.target.value);
		if (touched) {
			try {
				newMealNameValidationSchema.validateSync({
					newMealName: e.target.value,
				});
				setError("");
			} catch (err) {
				if (err instanceof yup.ValidationError) {
					setError(err.message);
				}
			}
		}
	};

	const handleAddMealName = () => {
		if (!error && newMealName.trim()) {
			onAdd(newMealName);
			setNewMealName("");
			setTouched(false);
		}
	};

	return (
		<div className='add-meal'>
			<Input
				name='newMealName'
				type='text'
				value={newMealName}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder='Wpisz nazwę posiłku'
				error={error}
				touched={touched}
			/>
			<button
				type='button'
				onClick={handleAddMealName}
				disabled={Boolean(error || !newMealName.trim())}>
				Add
			</button>
		</div>
	);
};

export default NewMealNameInput;
