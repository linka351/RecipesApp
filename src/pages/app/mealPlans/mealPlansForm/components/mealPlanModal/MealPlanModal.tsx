import Modal from "../../../../../../components/modal/Modal";
import RecipeList from "../../../../recipes/Recipes";
import "./mealPlanModal.scss";
import Button from "../../../../../../components/buttons/Button";

type MealPlanModalProps = {
	onClose: () => void;
	onSelectRecipe: (recipeId: string) => void;
};

const MealPlanModal = ({ onClose, onSelectRecipe }: MealPlanModalProps) => {
	return (
		<Modal close={onClose} headerText='Wybierz przepis'>
			<RecipeList
				showAddButton={false}
				customButtons={recipe => (
					<Button
						className='modal-button'
						onClick={() => onSelectRecipe(recipe.id)}>
						Dodaj
					</Button>
				)}
				listClassName='modal-list'
				imageClassName='modal-image'
				elementsContainerClassName='modal-elements-container'
			/>
		</Modal>
	);
};

export default MealPlanModal;
