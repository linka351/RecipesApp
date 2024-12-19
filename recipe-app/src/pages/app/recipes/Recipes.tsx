import { useEffect, useState } from "react";
import { Recipe } from "../../../types/editRecipe";
import { recipeApi } from "../../../api/recipes";
import { Link } from "react-router-dom";
import image from "../../../images/StockCake-Healthy Meal Prep_1725388250.jpg";

import "./recipes.scss";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";

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
				<p className='list-recipe'>Lista Przepisów</p>
				<Link className='add-recipe-link' to={"/app/recipes/add"}>
					<Button className='add-recipe'>Dodaj Przepis</Button>
				</Link>
			</div>
			<Input
				name='searchRecipe'
				type='text'
				placeholder='Wyszukaj przepisy...'
				value={searchRecipe}
				onChange={handleSearch}
			/>
			<div className='recipe-main'>
				<ul className='list'>
					{filteredRecipes.map(recipe => (
						<li className='recipe' key={recipe.id}>
							<img src={image} className='image' />
							<p className='name'>{recipe.name}</p>
							<p className='description'>{recipe.description}</p>
							<div className='recipe-buttons'>
								<Link to={`/app/recipes/edit/${recipe.id}`}>
									<Button type='button' className='edit-button'>
										Edytuj
									</Button>
								</Link>
								<Button
									type='button'
									className='delete-button'
									onClick={() => handleDelete(recipe.id)}>
									Usuń
								</Button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Recipes;
