import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InstructionsForm from "./InstructionsForm";
import "@testing-library/jest-dom";

const mockOnInstructionsAdded = jest.fn();
const mockOnRemove = jest.fn();

describe("InstructionsForm", () => {
	const setup = (propsOverrides = {}) => {
		const initialProps = {
			onInstructionsAdded: mockOnInstructionsAdded,
			onRemove: mockOnRemove,
			instructions: [],
			touched: false,
			errors: "",
			...propsOverrides,
		};

		return render(<InstructionsForm {...initialProps} />);
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders the form with initial elements", () => {
		setup();

		expect(screen.getByLabelText("Dodaj Instrukcje")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Add" })).toBeDisabled();
	});

	test("enables add button when instruction input is not empty", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcje");

		await userEvent.type(instructionInput, "Test instruction");

		expect(screen.getByRole("button", { name: "Add" })).not.toBeDisabled();
	});

	test("calls onInstructionsAdded when form is submitted", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcje");
		const addButton = screen.getByRole("button", { name: "Add" });

		await userEvent.type(instructionInput, "Test instruction");
		await userEvent.click(addButton);

		expect(mockOnInstructionsAdded).toHaveBeenCalledWith("Test instruction");
		expect(mockOnInstructionsAdded).toHaveBeenCalledTimes(1);
	});

	test("displays validation errors", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcje");

		await userEvent.type(instructionInput, "T");
		const submitButton = screen.getByRole("button", { name: "Add" });
		await userEvent.click(submitButton);

		expect(
			screen.getByText("Instrukcja musi składać się z co najmniej 5 znaków")
		).toBeInTheDocument();

		await userEvent.type(instructionInput, "Test instruction");
		await userEvent.click(submitButton);

		expect(
			screen.queryByText(
				"Nazwa składniku powinna składać się conajmniej z trzech liter"
			)
		).not.toBeInTheDocument();
	});

	test("displays form-level errors", () => {
		setup({
			touched: true,
			errors: "Form error",
		});

		expect(screen.getByText("Form error")).toBeInTheDocument();
	});
});
