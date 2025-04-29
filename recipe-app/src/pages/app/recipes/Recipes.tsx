import React, { useEffect, useState } from "react";
import { Recipe } from "../../../types/editRecipe";
import { recipeApi } from "../../../api/recipes";
import "../../../styles/global/globalVariables.scss";

import "./recipes.scss";
import Input from "../../../components/inputs/Input";
import { RecipeCardProps } from "./recipe.types";
import RecipeCard from "./recipeCard/RecipeCard";
import { Link } from "react-router-dom";
import Switch from "../../../components/switch/Switch";
import { useAuth } from "../../../context/AuthContext";

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
	header = "Lista Przepisów",
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
	const [showOnlyPrivate, setShowOnlyPrivate] = useState(false);

	const { user } = useAuth();

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

	const toggleFilter = () => {
		setShowOnlyPrivate(prev => !prev);
	};

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

	const filteredRecipes = recipes.filter(
		recipe => !showOnlyPrivate || recipe.userId === user?.id
	);

	return (
		<div className='recipe-list-container'>
			<div className='search-recipe'>
				{showAddButton && (
					<>
						<Switch
							isPrivate={showOnlyPrivate}
							handleToggleChange={toggleFilter}
						/>

						<h1 className='list-recipe'>{header}</h1>

						<Link
							to={"/app/recipes/add"}
							className='add-recipe-link'
							onClick={onAddClick}>
							{addButtonLabel}
						</Link>
					</>
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
