import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import IngredientsForm from "./IngredientsForm";

const mockOnIngredientsAdded = jest.fn();
const mockOnRemove = jest.fn();
const mockOnIngredientEdited = jest.fn();

describe("IngredientsForm", () => {
	const setup = (propsOverrides = {}) => {
		const initialProps = {
			onIngredientsAdded: mockOnIngredientsAdded,
			onIngredientEdited: mockOnIngredientEdited,
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
		expect(screen.getByRole("button", { name: "Dodaj" })).toBeDisabled();
	});

	test("enables add button when ingredient input is not empty", async () => {
		setup();
		const ingredientsInput = screen.getByLabelText("Dodaj Składnik");

		await userEvent.type(ingredientsInput, "Test ingredient");

		expect(screen.getByRole("button", { name: "Dodaj" })).not.toBeDisabled();
	});

	test("calls onIngredientsAdded when form is submitted", async () => {
		setup();
		const ingredientInput = screen.getByLabelText("Dodaj Składnik");
		const addButton = screen.getByRole("button", { name: "Dodaj" });

		await userEvent.type(ingredientInput, "Test ingredient");
		await userEvent.click(addButton);

		expect(mockOnIngredientsAdded).toHaveBeenCalledWith("Test ingredient");
		expect(mockOnIngredientsAdded).toHaveBeenCalledTimes(1);
	});

	test("displays validation errors", async () => {
		setup();
		const ingredientInput = screen.getByLabelText("Dodaj Składnik");

		await userEvent.type(ingredientInput, "T");
		const submitButton = screen.getByRole("button", { name: "Dodaj" });
		await userEvent.click(submitButton);

		expect(
			screen.getByText(
				"Nazwa składniku powinna składać się conajmniej z trzech liter"
			)
		).toBeInTheDocument();

		await userEvent.type(ingredientInput, "Test ingredient");
		await userEvent.click(submitButton);

		expect(
			screen.queryByText(
				"Nazwa składniku powinna składać się conajmniej z trzech liter"
			)
		).not.toBeInTheDocument();
	});

	test("allows ingredient to be edited", async () => {
		setup({
			ingredients: ["Ingredient 1", "Ingredient 2"],
		});
		const editButton = screen.getAllByTestId("edit-ingredient")[0];

		await userEvent.click(editButton);

		const saveButton = screen.getByText("Zapisz");
		const ingredientInput = screen.getByLabelText("Edytuj Składnik");

		expect(ingredientInput).toHaveValue("Ingredient 1");

		await userEvent.clear(ingredientInput);
		await userEvent.type(ingredientInput, "Edited Ingredient");
		await userEvent.click(saveButton);

		expect(mockOnIngredientEdited).toHaveBeenCalledWith(0, "Edited Ingredient");
		expect(mockOnIngredientEdited).toHaveBeenCalledTimes(1);
	});

	test("allows ingredient to be removed", async () => {
		setup({
			ingredients: ["Ingredient 1", "Ingredient 2"],
		});
		const removeButton = screen.getAllByTestId("remove-ingredient")[0];

		await userEvent.click(removeButton);

		expect(mockOnRemove).toHaveBeenCalledWith(0);
		expect(mockOnRemove).toHaveBeenCalledTimes(1);
	});
});
