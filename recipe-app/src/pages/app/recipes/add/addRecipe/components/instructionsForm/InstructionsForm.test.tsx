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
	});

	test("displays validation errors", async () => {
		setup({
			touched: true,
			errors: "Required",
		});
		const instructionInput = screen.getByLabelText("Dodaj Instrukcje");

		await userEvent.type(instructionInput, "Test instruction");
		instructionInput.blur();

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
