import { useEffect, useState } from "react";
import { Recipe } from "../../../types/editRecipe";
import { recipeApi } from "../../../api/recipes";
import { Link } from "react-router-dom";
import "../../../styles/global/globalVariables.scss";

import "./recipes.scss";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import image from "../../../images/22204570_6605525.jpg";

function Recipes() {
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
				<h1 className='list-recipe'>Lista Przepisów</h1>
				<Link className='add-recipe-link' to={"/app/recipes/add"}>
					Dodaj Przepis
				</Link>
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
				<ul className='list'>
					{filteredRecipes.map(recipe => (
						<li className='recipe' key={recipe.id}>
							{recipe.image === "" ? (
								<img src={image} className='image' />
							) : (
								<img src={recipe.image} className='image' />
							)}
							<div className='elements-container'>
								<p className='name'>{recipe.name}</p>
								<p className='description'>{recipe.description}</p>
								<div className='recipe-buttons'>
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
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Recipes;
