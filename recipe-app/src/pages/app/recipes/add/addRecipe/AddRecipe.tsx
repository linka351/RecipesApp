import RecipesForm from "../../recipesForm/RecipesForm";

function AddRecipe({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
	return (
		<div>
			<RecipesForm onSubmitSuccess={onSubmitSuccess} />
		</div>
	);
}

export default AddRecipe;
