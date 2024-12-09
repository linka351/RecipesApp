import { useEffect, useState } from "react";
import { DayName } from "../../../../../../types/MealPlan";
import { Recipe } from "../../../../../../types/editRecipe";
import { MealPlan } from "../../../add/addMealPlan/types";
import Input from "../../../../../../components/inputs/Input";
import MealPlanModal from "../mealPlanModal/MealPlanModal";
import "./mealTable.scss";

const days: DayName[] = [
	"Poniedziałek",
	"Wtorek",
	"Środa",
	"Czwartek",
	"Piątek",
	"Sobota",
	"Niedziela",
];

type MealNamesProps = {
	mealName: string[];
	onAddMealName: (newMeal: string) => void;
	recipes: Recipe[];
	onChange: (day: DayName, meal: string, recipeId: string) => void;
	selectedRecipes: MealPlan;
};

const MealTable = ({
	mealName,
	onAddMealName,
	recipes,
	onChange,
	selectedRecipes,
}: MealNamesProps) => {
	const [inputValue, setInputValue] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedDayMeal, setSelectedDayMeal] = useState<{
		day: DayName;
		meal: string;
	} | null>(null);

	useEffect(() => {
		if (isModalOpen) {
			document.body.classList.add("modal-open");
			document.documentElement.classList.add("no-scroll");
		} else {
			document.body.classList.remove("modal-open");
			document.documentElement.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("modal-open");
			document.documentElement.classList.remove("no-scroll");
		};
	}, [isModalOpen]);

	const addMealName = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onAddMealName(inputValue.trim());
			setInputValue("");
		}
	};

	const openModal = (day: DayName, meal: string) => {
		setSelectedDayMeal({ day, meal });
		setIsModalOpen(true);
	};

	const handleRecipeSelect = (recipeId: string) => {
		if (selectedDayMeal) {
			onChange(selectedDayMeal.day, selectedDayMeal.meal, recipeId);
		}
		setIsModalOpen(false);
	};

	return (
		<>
			<div className='meal-table-container'>
				<div className='add-meal'>
					<Input
						name='mealName'
						type='text'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						placeholder='Wpisz nazwę posiłku'
					/>
					<button onClick={addMealName}>Add</button>
				</div>

				{mealName.length > 0 && (
					<div className='meal-plan-grid'>
						<div className='header-cell'>
							<p>Nazwa Posiłku</p>
						</div>
						{days.map(day => (
							<div key={day} className='header-cell'>
								{day}
							</div>
						))}

						{mealName.map(meal => (
							<>
								<div key={meal} className='meal-header'>
									{meal}
								</div>
								{days.map(day => (
									<div key={`${day}-${meal}`} className='meal-select'>
										<div
											className='recipe-name'
											onClick={() => openModal(day, meal)}>
											{recipes.find(
												recipe => recipe.id === selectedRecipes?.[day]?.[meal]
											)?.name || "Wybierz Przepis"}
										</div>
									</div>
								))}
							</>
						))}
					</div>
				)}
			</div>

			{isModalOpen && (
				<MealPlanModal
					recipes={recipes}
					onClose={() => setIsModalOpen(false)}
					onSelectRecipe={handleRecipeSelect}
				/>
			)}
		</>
	);
};

export default MealTable;
