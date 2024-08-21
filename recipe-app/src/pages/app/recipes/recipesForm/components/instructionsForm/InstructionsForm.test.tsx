import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InstructionsForm from "./InstructionsForm";
import "@testing-library/jest-dom";

const mockOnInstructionsAdded = jest.fn();
const mockOnRemove = jest.fn();
const mockOnInstructionEdited = jest.fn();

describe("InstructionsForm", () => {
	const setup = (propsOverrides = {}) => {
		const initialProps = {
			onInstructionsAdded: mockOnInstructionsAdded,
			onInstructionEdited: mockOnInstructionEdited,
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

		expect(screen.getByLabelText("Dodaj Instrukcję")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Dodaj" })).toBeDisabled();
	});

	test("enables add button when instruction input is not empty", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcję");

		await userEvent.type(instructionInput, "Testowa instrukcja");

		expect(screen.getByRole("button", { name: "Dodaj" })).not.toBeDisabled();
	});

	test("calls onInstructionsAdded when form is submitted", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcję");
		const addButton = screen.getByRole("button", { name: "Dodaj" });

		await userEvent.type(instructionInput, "Testowa instrukcja");
		await userEvent.click(addButton);

		expect(mockOnInstructionsAdded).toHaveBeenCalledWith("Testowa instrukcja");
		expect(mockOnInstructionsAdded).toHaveBeenCalledTimes(1);
	});

	test("displays validation errors", async () => {
		setup();
		const instructionInput = screen.getByLabelText("Dodaj Instrukcję");

		await userEvent.type(instructionInput, "T");
		const submitButton = screen.getByRole("button", { name: "Dodaj" });
		await userEvent.click(submitButton);

		expect(
			screen.getByText("Instrukcja musi składać się z co najmniej 5 znaków")
		).toBeInTheDocument();

		await userEvent.type(instructionInput, "Testowa instrukcja");
		await userEvent.click(submitButton);

		expect(
			screen.queryByText("Instrukcja musi składać się z co najmniej 5 znaków")
		).not.toBeInTheDocument();
	});

	test("displays form-level errors", () => {
		setup({
			touched: true,
			errors: "Form error",
		});

		expect(screen.getByText("Form error")).toBeInTheDocument();
	});

	test("allows instruction to be edited", async () => {
		setup({
			instructions: ["Instruction 1", "Instruction 2"],
		});
		const editButton = screen.getAllByTestId("edit-instruction")[0];

		await userEvent.click(editButton);

		const saveButton = screen.getByText("Zapisz");
		const instructionInput = screen.getByLabelText("Edytuj Instrukcję");

		expect(screen.getByLabelText("Edytuj Instrukcję")).toHaveValue(
			"Instruction 1"
		);

		await userEvent.clear(instructionInput);
		await userEvent.type(instructionInput, "Edited Instruction");
		await userEvent.click(saveButton);

		expect(mockOnInstructionEdited).toHaveBeenCalledWith(
			0,
			"Edited Instruction"
		);
		expect(mockOnInstructionEdited).toHaveBeenCalledTimes(1);
	});

	test("allows instruction to be removed", async () => {
		setup({
			instructions: ["Instruction 1", "Instruction 2"],
		});
		const removeButton = screen.getAllByTestId("remove-instruction")[0];

		await userEvent.click(removeButton);

		expect(mockOnRemove).toHaveBeenCalledWith(0);
		expect(mockOnRemove).toHaveBeenCalledTimes(1);
	});
});
