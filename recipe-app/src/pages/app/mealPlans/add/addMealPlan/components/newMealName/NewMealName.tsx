import React, { useState } from "react";
import * as yup from "yup";
import Input from "../../../../../../../components/inputs/Input";
import { newMealNameValidationSchema } from "../../../../mealPlansForm/MealPlansForm.validation";
import "./newMealName.scss";
import Button from "../../../../../../../components/buttons/Button";

type NewMealNameInputProps = {
	onAdd: (mealName: string) => void;
};

const NewMealNameInput: React.FC<NewMealNameInputProps> = ({ onAdd }) => {
	const [newMealName, setNewMealName] = useState("");
	const [error, setError] = useState<string>("");
	const [touched, setTouched] = useState(false);

	const validateNewMealName = (value: string): boolean => {
		try {
			newMealNameValidationSchema.validateSync({ newMealName: value });
			setError("");
			return true;
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				setError(err.message);
			}
			return false;
		}
	};

	const handleBlur = () => {
		setTouched(true);
		validateNewMealName(newMealName);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNewMealName(value);
		validateNewMealName(value);
	};

	const handleAddMealName = () => {
		setTouched(true);

		if (validateNewMealName(newMealName)) {
			onAdd(newMealName);
			setNewMealName("");
			setTouched(false);
		}
	};
	return (
		<div className='add-meal'>
			<Input
				inputClassName='new-meal-name'
				name='newMealName'
				type='text'
				value={newMealName}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder='Wpisz nazwę posiłku'
				error={error}
				touched={touched}
			/>
			<Button
				className='new-meal-submit'
				type='button'
				onClick={handleAddMealName}
				disabled={Boolean(error || !newMealName.trim())}>
				Add
			</Button>
		</div>
	);
};

export default NewMealNameInput;
