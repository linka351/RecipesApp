import React, { useEffect, useState } from "react";
import { Recipe } from "../../../types/editRecipe";
import { recipeApi } from "../../../api/recipes";
import "../../../styles/global/globalVariables.scss";

import "./recipes.scss";
import Input from "../../../components/inputs/Input";
import { RecipeCardProps } from "./recipe.types";
import RecipeCard from "./recipeCard/RecipeCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = Pick<
	RecipeCardProps,
	"customButtons" | "elementsContainerClassName" | "imageClassName"
> & {
	header?: string;
	addButtonLabel?: string;
	showAddButton?: boolean;
	onAddClick?: () => void;
	listClassName?: string;
};
const RecipeList = ({
	header = "Lista Prepisów",
	addButtonLabel = "Dodaj Przepis",
	showAddButton = true,
	onAddClick,
	listClassName,
	customButtons,
	imageClassName,
	elementsContainerClassName,
}: Props) => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [searchRecipe, setSearchRecipe] = useState<string>("");

	useEffect(() => {
		try {
			const fetchRecipes = async () => {
				const recipeList = await recipeApi.getAll();
				setRecipes(recipeList);
			};

			fetchRecipes();
		} catch (error) {
			console.error("Error fetchRecipes document: ", error);
		}
	}, []);

	const handleDelete = async (id: string) => {
		try {
			await recipeApi.remove(id);
			setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
			toast.error("Usunięto przepis");
		} catch (error) {
			toast.error("Wystąpił błąd przy usuwaniu przepisu");
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
					<Link
						to={"/app/recipes/add"}
						className='add-recipe-link'
						onClick={onAddClick}>
						{addButtonLabel}
					</Link>
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
						<RecipeCard
							customButtons={customButtons}
							imageClassName={imageClassName}
							elementsContainerClassName={elementsContainerClassName}
							recipe={recipe}
							handleDelete={handleDelete}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RecipeList;
