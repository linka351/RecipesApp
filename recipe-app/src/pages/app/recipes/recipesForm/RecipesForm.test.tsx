import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import RecipesForm from "./RecipesForm";

const mockOnSubmit = jest.fn();

jest.mock("../../../../api/recipes", () => ({
	recipeApi: {
		add: jest.fn().mockImplementation(() => Promise.resolve()),
	},
}));
describe("RecipesForm Component", () => {
	test("renders the form with initial elements", () => {
		render(<RecipesForm onSubmit={mockOnSubmit} />);

		expect(screen.getByPlaceholderText("Nazwa przepisu")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Krótki opis przepisu")
		).toBeInTheDocument();
	});

	test("validates the form and displays errors when required fields are missing or invalid", async () => {
		render(<RecipesForm onSubmit={mockOnSubmit} />);

		await userEvent.click(screen.getByText("Zapisz"));

		expect(screen.getAllByText("Pole wymagane")).toHaveLength(2);

		await userEvent.type(screen.getByPlaceholderText("Nazwa przepisu"), "Te");
		await userEvent.type(
			screen.getByPlaceholderText("Krótki opis przepisu"),
			"Op"
		);
		await userEvent.type(screen.getByLabelText("Dodaj Instrukcję"), "Step");
		await userEvent.click(screen.getByTestId("add-instruction"));
		await userEvent.type(screen.getByLabelText("Dodaj Składnik"), "Sk");
		await userEvent.click(screen.getByTestId("add-ingredient"));

		await userEvent.click(screen.getByText("Zapisz"));

		expect(screen.getByText("Pole dłuzsze niż 3 znaki")).toBeInTheDocument();
		expect(
			screen.getByText("Opis musi składać się z więcej niż 5 liter")
		).toBeInTheDocument();
		expect(
			screen.getByText("Instrukcja musi składać się z co najmniej 5 znaków")
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Nazwa składniku powinna składać się conajmniej z trzech liter"
			)
		).toBeInTheDocument();
	});

	test("calls onSubmit when the form is correctly filled and submitted", async () => {
		render(<RecipesForm onSubmit={mockOnSubmit} />);

		await userEvent.type(
			screen.getByPlaceholderText("Nazwa przepisu"),
			"Test Recipe"
		);
		await userEvent.type(
			screen.getByPlaceholderText("Krótki opis przepisu"),
			"Test Description"
		);

		await userEvent.type(screen.getByLabelText("Dodaj Instrukcję"), "Step 1");
		await userEvent.click(screen.getByTestId("add-instruction"));
		await userEvent.type(screen.getByLabelText("Dodaj Instrukcję"), "Step 2");
		await userEvent.click(screen.getByTestId("add-instruction"));

		await userEvent.type(
			screen.getByLabelText("Dodaj Składnik"),
			"Ingredient 1"
		);
		await userEvent.click(screen.getByTestId("add-ingredient"));
		await userEvent.type(
			screen.getByLabelText("Dodaj Składnik"),
			"Ingredient 2"
		);
		await userEvent.click(screen.getByTestId("add-ingredient"));
		await userEvent.type(
			screen.getByLabelText("Dodaj Składnik"),
			"Ingredient 3"
		);
		await userEvent.click(screen.getByTestId("add-ingredient"));

		await userEvent.click(screen.getByText("Zapisz"));

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
	});
});
