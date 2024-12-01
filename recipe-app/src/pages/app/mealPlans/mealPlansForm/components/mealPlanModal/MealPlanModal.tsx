import { useState } from "react";
import { Recipe } from "../../../../../../types/editRecipe";
import Modal from "../../../../../../components/modal/Modal";

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
		<Modal close={onClose} headerText='Wybierz przepis'>
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
		</Modal>
	);
};

export default MealPlanModal;
