import { render, screen } from "@testing-library/react";
import Recipes from "./Recipes";
import { BrowserRouter } from "react-router-dom";
import { recipesMocks } from "../../../api/recipesMocks";
import "@testing-library/jest-dom";

jest.mock("../../../api/recipes", () => ({
	recipeApi: {
		getAll: jest.fn().mockImplementation(() => Promise.resolve(recipesMocks)),
	},
}));

describe("Recipes component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
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

		expect(buttons.length).toBe(recipesMocks.length);
	});
});
