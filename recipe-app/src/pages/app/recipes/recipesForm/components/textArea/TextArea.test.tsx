import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "./TextArea";
import userEvent from "@testing-library/user-event";

const mockTextArea = jest.fn();

describe("TextArea component", () => {
	const setup = (propsOverrides = {}) => {
		const initialProps = {
			placeholder: "Enter description",
			name: "description",
			onChange: mockTextArea,
			value: "",
			touched: false,
			errors: "",
			...propsOverrides,
		};

		return render(<TextArea {...initialProps} />);
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders with initial value provided via props", () => {
		setup({
			value: "Initial description",
		});

		const textareaElement = screen.getByPlaceholderText(
			"Enter description"
		) as HTMLTextAreaElement;
		expect(textareaElement).toBeInTheDocument();
		expect(textareaElement.value).toBe("Initial description");
	});

	test("displays error message when touched is true and errors are present", async () => {
		setup({
			touched: true,
			errors: "Description is required",
		});

		const errorElement = screen.getByText("Description is required");
		expect(errorElement).toBeInTheDocument();
	});

	test("shows yup component error when touched is true", async () => {
		setup({
			touched: true,
			errors: "Opis musi składać się z więcej niż 5 liter",
		});

		const textareaElement = screen.getByPlaceholderText("Enter description");
		await userEvent.type(textareaElement, "test");

		const errorElement = screen.getByText(
			"Opis musi składać się z więcej niż 5 liter"
		);
		expect(errorElement).toBeInTheDocument();
	});

	test("should update TextArea value and call onChange handler on typing", async () => {
		setup({
			touched: true,
		});

		const textAreaElement = screen.getByPlaceholderText("Enter description");
		expect(textAreaElement).toHaveValue("");
		await userEvent.type(textAreaElement, "test");
		expect(mockTextArea).toHaveBeenCalledTimes(4);
	});
});
