import { Link, useNavigate } from "react-router-dom";
import defaultImage from "../../../../images/22204570_6605525.jpg";
import { RecipeCardProps } from "../recipe.types";

export default function RecipeCard({
	recipe,
	imageClassName,
	elementsContainerClassName,
	customButtons,
}: RecipeCardProps) {
	const navigate = useNavigate();

	const handleDetails = () => {
		navigate(`/app/recipes/details/${recipe.id}`);
	};
	return (
		<li className='recipe' key={recipe.id}>
			<img
				onClick={handleDetails}
				src={recipe.image || defaultImage}
				alt={recipe.name}
				className={`${imageClassName} image`}
			/>
			<div className={`${elementsContainerClassName} elements-container`}>
				<p className='name'>{recipe.name}</p>
				<p className='description'>{recipe.description}</p>
				<div className='recipe-buttons'>
					{customButtons ? (
						customButtons(recipe)
					) : (
						<>
							<Link
								to={`/app/recipes/details/${recipe.id}`}
								className='edit-button'>
								Szczegóły
							</Link>
						</>
					)}
				</div>
			</div>
		</li>
	);
}
