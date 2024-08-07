import RecipesForm from "../../recipesForm/RecipesForm";

function AddRecipe({ onSubmit }: { onSubmit: () => void }) {
	return (
		<div>
			<RecipesForm onSubmit={onSubmit} />
		</div>
	);
}

export default AddRecipe;
