import { render, screen } from "@testing-library/react";
import Recipes from "./Recipes";
import { recipeApi } from "../../../api/recipes";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../api/recipes", () => ({
	recipeApi: {
		getAll: jest.fn(),
	},
}));

describe("Recipes component", () => {
	const mockRecipes = [
		{ id: 1, name: "Recipe 1" },
		{ id: 2, name: "Recipe 2" },
	];

	beforeEach(() => {
		(recipeApi.getAll as jest.Mock).mockResolvedValue(mockRecipes);
	});

	test("should render Recipes component", () => {
		render(
			<BrowserRouter>
				<Recipes />
			</BrowserRouter>
		);
		expect(screen.getByRole("list")).toBeInTheDocument();
	});

	test("should render Recipes component with recipes", async () => {
		render(
			<BrowserRouter>
				<Recipes />
			</BrowserRouter>
		);

		const firstRecipe = await screen.findByText("Recipe 1");

		const secondRecipe = await screen.findByText("Recipe 2");

		expect(firstRecipe).toBeInTheDocument();
		expect(secondRecipe).toBeInTheDocument();
	});

	test("should render edit buttons for each recipe", async () => {
		render(
			<BrowserRouter>
				<Recipes />
			</BrowserRouter>
		);

		const buttons = await screen.findAllByText("Edytuj");

		expect(buttons.length).toBe(mockRecipes.length);
	});
});
