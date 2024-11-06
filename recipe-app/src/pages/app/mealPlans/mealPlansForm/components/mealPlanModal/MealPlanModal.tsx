import { useState } from "react";
import { Recipe } from "../../../../../../types/editRecipe";

type MealPlanModalProps = {
	recipes: Recipe[];
	onClose: () => void;
	onSelectRecipe: (recipeId: string) => void;
};

const MealPlanModal = ({
	recipes,
	onClose,
	onSelectRecipe,
}: MealPlanModalProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredRecipes = searchTerm
		? recipes.filter(recipe =>
				recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		: recipes;

	return (
		<div className='meal-plan-modal'>
			<button onClick={onClose} className='close-modal'>
				X
			</button>

			<div className='search-input'>
				<input
					type='text'
					placeholder='Wyszukaj przepis...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className='recipe-list'>
				{filteredRecipes.map(recipe => (
					<div
						key={recipe.id}
						className='recipe-item'
						onClick={() => onSelectRecipe(recipe.id)}>
						{recipe.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default MealPlanModal;
