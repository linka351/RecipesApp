import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Input from "./Input";

describe("Input component", () => {
	const onChangeMock = jest.fn();
	const setup = (propsOverride = {}) => {
		const props = {
			placeholder: "Enter text",
			name: "testInput",
			onChange: onChangeMock,
			value: "",
			touched: false,
			errors: "",
			...propsOverride,
		};
		render(<Input {...props} />);
		const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
		return {
			input,
			onChangeMock,
		};
	};

	beforeEach(() => {
		onChangeMock.mockClear();
	});

	test("renders the input with correct placeholder", () => {
		const { input } = setup();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "Enter text");
	});

	test("calls onChange function when typing", async () => {
		const user = userEvent.setup();
		const { input, onChangeMock } = setup();
		await user.type(input, "Hello");
		expect(onChangeMock).toHaveBeenCalledTimes(5);
	});

		test("calls onChange function when typing", async () => {
		const user = userEvent.setup();
		const { input, onChangeMock } = setup();
		await user.type(input, "Hello");
		expect(onChangeMock).toHaveBeenCalledTimes(5);
	});


	test("displays error message when touched and errors are present", () => {
		setup({ touched: true, errors: "This field is required" });
		const errorMessage = screen.getByText("This field is required");
		expect(errorMessage).toBeInTheDocument();
	});

	test("does not display error message when not touched", () => {
		setup();
		const errorMessage = screen.queryByText("This field is required");
		expect(errorMessage).not.toBeInTheDocument();
	});
});
