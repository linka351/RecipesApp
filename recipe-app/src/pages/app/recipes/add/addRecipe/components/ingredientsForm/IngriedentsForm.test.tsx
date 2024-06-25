import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import IngredientsForm from "./IngredientsForm";

const mockOnIngredientsAdded = jest.fn();
const mockOnRemove = jest.fn();

describe("IngredientsForm", () => {
	const setup = (propsOverrides = {}) => {
		const initialProps = {
			onIngredientsAdded: mockOnIngredientsAdded,
			onRemove: mockOnRemove,
			ingredients: [],
			touched: false,
			errors: "",
			...propsOverrides,
		};

		return render(<IngredientsForm {...initialProps} />);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders the form with initial elements", () => {
		setup();

		expect(screen.getByLabelText("Dodaj Składnik")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
	});

	test("enables add button when ingredient input is not empty", async () => {
		setup();
		const ingredientsInput = screen.getByLabelText("Dodaj Składnik");

		await userEvent.type(ingredientsInput, "Test ingredient");

		expect(screen.getByRole("button", { name: "Add" })).not.toBeDisabled();
	});

	test("calls onIngredientsAdded when form is submitted", async () => {
		setup();
		const ingredientInput = screen.getByLabelText("Dodaj Składnik");
		const addButton = screen.getByRole("button", { name: "Add" });

		await userEvent.type(ingredientInput, "Test ingredient");
		await userEvent.click(addButton);

		expect(mockOnIngredientsAdded).toHaveBeenCalledWith("Test ingredient");
	});

	test("displays validation errors", async () => {
		setup({
			touched: true,
			errors: "Required",
		});
		const ingredientInput = screen.getByLabelText("Dodaj Składnik");

		await userEvent.type(ingredientInput, "Test ingredient");
		ingredientInput.blur();

		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	test("displays form-level errors", () => {
		setup({
			touched: true,
			errors: "Form error",
		});

		expect(screen.getByText("Form error")).toBeInTheDocument();
	});
});
