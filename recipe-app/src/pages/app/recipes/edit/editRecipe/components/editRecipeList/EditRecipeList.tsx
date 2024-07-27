import { Recipe } from "../../../../../../../types/editRecipe";

import "./editRecipeList.scss";

interface EditRecipeListProps {
	onClick: (recipe: Recipe) => void;
	data: Recipe[];
}
const EditRecipeList: React.FC<EditRecipeListProps> = ({ onClick, data }) => {
	const handleClick =
		(recipe: Recipe) => (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			onClick(recipe);
		};
	return (
		<ul className='recipe-container'>
			{data.map(recipe => (
				<li className='recipe' key={recipe.id}>
					<p className='recipe-text'>{recipe.name}</p>
					<button className='recipe-button' onClick={handleClick(recipe)}>
						Edytuj
					</button>
				</li>
			))}
		</ul>
	);
};

export default EditRecipeList;
