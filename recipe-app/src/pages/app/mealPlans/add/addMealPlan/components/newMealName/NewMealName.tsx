import React, { useState } from "react";
import Input from "../../../../../../../components/inputs/Input";

type NewMealNameInputProps = {
	onAdd: (mealName: string) => void;
};

const NewMealNameInput: React.FC<NewMealNameInputProps> = ({ onAdd }) => {
	const [newMealName, setNewMealName] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleAddMealName = () => {
		if (!newMealName.trim()) {
			setError("Nazwa posiłku nie może być pusta.");
			return;
		}
		onAdd(newMealName);
		setNewMealName("");
		setError(null);
	};

	return (
		<div className='add-meal'>
			<Input
				name='newMealName'
				type='text'
				value={newMealName}
				onChange={e => setNewMealName(e.target.value)}
				placeholder='Wpisz nazwę posiłku'
			/>
			<button type='button' onClick={handleAddMealName}>
				Add
			</button>
			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};

export default NewMealNameInput;
