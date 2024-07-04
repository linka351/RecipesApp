import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddRecipe from "./AddRecipe";

jest.mock("../../../../../api/recipes", () => ({
	recipeApi: {
		add: jest.fn().mockImplementation(() => Promise.resolve()),
	},
}));

describe("AddRecipe Component", () => {
	test("renders the component", () => {
		render(<AddRecipe />);
		expect(screen.getByText("Nowy Przepis")).toBeInTheDocument();
	});

	test("validates the form correctly", async () => {
		render(<AddRecipe />);

		await userEvent.click(screen.getByText("Zapisz"));

		expect(
			screen.getByText("Przynajmniej dwie instrukcje są wymagane")
		).toBeInTheDocument();
	});

	test("submits the form correctly", async () => {
		render(<AddRecipe />);
		await userEvent.type(
			screen.getByPlaceholderText("Nazwa przepisu"),
			"Test Recipe"
		);

		await userEvent.type(
			screen.getByPlaceholderText("Krótki opis przepisu"),
			"Test Recipe Description"
		);
		await userEvent.type(
			screen.getByLabelText("Dodaj Instrukcje"),
			"Test Instruction 1"
		);
		await userEvent.click(screen.getByTestId("add-instruction"));
		await userEvent.type(
			screen.getByLabelText("Dodaj Instrukcje"),
			"Test Instruction 2"
		);
		await userEvent.click(screen.getByTestId("add-instruction"));
		await userEvent.type(
			screen.getByLabelText("Dodaj Składnik"),
			"Test Ingredient 1"
		);
		await userEvent.click(screen.getByTestId("add-ingredient"));
		await userEvent.type(
			screen.getByLabelText("Dodaj Składnik"),
			"Test Ingredient 2"
		);
		await userEvent.click(screen.getByTestId("add-ingredient"));
		await userEvent.click(screen.getByText("Zapisz"));

		//Dopytać bo coś nie działa
		expect(screen.getByPlaceholderText("Nazwa przepisu")).toHaveValue(
			"Test Recipe"
		);
		expect(screen.getByText("Test Recipe Description")).toBeInTheDocument();
		expect(screen.getByText("Test Instruction 1")).toBeInTheDocument();
		expect(screen.getByText("Test Instruction 2")).toBeInTheDocument();
		expect(screen.getByText("Test Ingredient 1")).toBeInTheDocument();
		expect(screen.getByText("Test Ingredient 2")).toBeInTheDocument();
	});

	test("allows the user to add instructions and ingredients", async () => {
		render(<AddRecipe />);

		await userEvent.type(
			screen.getByPlaceholderText("Nazwa przepisu"),
			"Test Recipe"
		);
		await userEvent.type(
			screen.getByPlaceholderText("Krótki opis przepisu"),
			"Test Recipe Description"
		);

		for (let index = 0; index < 3; index++) {
			await userEvent.type(
				screen.getByLabelText("Dodaj Instrukcje"),
				"Test Instruction " + (index + 1)
			);
			await userEvent.click(screen.getByTestId("add-instruction"));
		}

		for (let index = 0; index < 3; index++) {
			await userEvent.type(
				screen.getByLabelText("Dodaj Składnik"),
				"Test  Ingredient" + (index + 1)
			);
			await userEvent.click(screen.getByTestId("add-ingredient"));
		}

		await userEvent.click(screen.getByRole("button", { name: "Zapisz" }));
	});
});
