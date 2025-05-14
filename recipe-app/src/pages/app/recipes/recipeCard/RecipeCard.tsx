import { Link } from "react-router-dom";
import defaultImage from "../../../../images/22204570_6605525.jpg";
import { RecipeCardProps } from "../recipe.types";

export default function RecipeCard({
	recipe,
	imageClassName,
	elementsContainerClassName,
	customButtons,
}: RecipeCardProps) {
	return (
		<li className='recipe' key={recipe.id}>
			<img
				src={recipe.image || defaultImage}
				alt={recipe.name}
				className={`${imageClassName} image`}
			/>
			<div className={`${elementsContainerClassName} elements-container`}>
				<p className='name'>{recipe.name}</p>
				<p className='description'>{recipe.description}</p>
				<div className='recipe-buttons'>
					{customButtons
						? customButtons(recipe)
						: recipe.status !== "public" && (
								<>
									<Link
										to={`/app/recipes/edit/${recipe.id}`}
										className='edit-button'>
										Edytuj
									</Link>
									<Button
										type='button'
										className='delete-button'
										onClick={() => handleDelete(recipe.id)}>
										Usuń
									</Button>
								</>
							)}
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
