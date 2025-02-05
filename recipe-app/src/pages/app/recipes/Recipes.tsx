import React, { useEffect, useState } from "react";
import { Recipe } from "../../../types/editRecipe";
import { recipeApi } from "../../../api/recipes";
import { Link } from "react-router-dom";
import "../../../styles/global/globalVariables.scss";
import "./recipes.scss";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import defaultImage from "../../../images/22204570_6605525.jpg";

type Props = {
	header?: string;
	addButtonLabel?: string;
	showAddButton?: boolean;
	onAddClick?: () => void;
	customButtons?: (recipe: Recipe) => React.ReactNode;
	imageClassName?: string;
	elementsContainerClassName?: string;
	listClassName?: string;
};
const RecipeList: React.FC<Props> = ({
	header = "Lista Prepisów",
	addButtonLabel = "Dodaj Przepis",
	showAddButton = true,
	onAddClick,
	customButtons,
	imageClassName,
	elementsContainerClassName,
	listClassName,
}) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [searchRecipe, setSearchRecipe] = useState<string>("");

	useEffect(() => {
		async function fetchRecipes() {
			const recipeList = await recipeApi.getAll();
			setRecipes(recipeList);
		}

		fetchRecipes();
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await recipeApi.remove(id);
			setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchRecipe(e.target.value);
	};

	const filteredRecipes = searchRecipe
		? recipes.filter(recipe =>
				recipe.name.toLowerCase().includes(searchRecipe.toLowerCase())
			)
		: recipes;

	return (
		<div className='recipe-list-container'>
			<div className='search-recipe'>
				{header && <h1 className='list-recipe'>Lista Przepisów</h1>}
				{showAddButton && (
					<Button className='add-recipe-link' onClick={onAddClick}>
						{addButtonLabel}
					</Button>
				)}
			</div>
			<Input
				name='searchRecipe'
				type='text'
				placeholder='Wyszukaj przepisy...'
				value={searchRecipe}
				onChange={handleSearch}
				inputClassName='recipe-input'
			/>
			<div className='recipe-main'>
				<ul className={`${listClassName} list`}>
					{filteredRecipes.map(recipe => (
						<li className='recipe' key={recipe.id}>
							<img
								src={recipe.image || defaultImage}
								alt={recipe.name}
								className={`${imageClassName} image`}
							/>
							<div
								className={`${elementsContainerClassName} elements-container`}>
								<p className='name'>{recipe.name}</p>
								<p className='description'>{recipe.description}</p>
								<div className='recipe-buttons'>
									{customButtons ? (
										customButtons(recipe)
									) : (
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
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RecipeList;
