import { Recipe } from "../../../types/editRecipe";

export type RecipeCardProps = {
	recipe: Recipe;
	imageClassName?: string;
	elementsContainerClassName?: string;
	customButtons?: (recipe: Recipe) => React.ReactNode;
};
