import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextArea from "./TextArea";
import userEvent from "@testing-library/user-event";

describe("TextArea component", () => {
	test("renders with initial value provided via props", () => {
		const onChange = jest.fn();
		const initialValue = "Initial description";

		render(
			<TextArea
				placeholder='Enter description'
				name='description'
				onChange={onChange}
				value={initialValue}
				touched={false}
				errors=''
			/>
		);

		const textareaElement = screen.getByPlaceholderText(
			"Enter description"
		) as HTMLTextAreaElement;
		expect(textareaElement).toBeInTheDocument();
		expect(textareaElement.value).toBe(initialValue);
	});

	test("displays error message when touched is true and errors are present", () => {
		render(
			<TextArea
				placeholder='Enter description'
				name='description'
				onChange={jest.fn()}
				value=''
				touched={true}
				errors='Description is required'
			/>
		);

		const errorElement = screen.getByText("Description is required");
		expect(errorElement).toBeInTheDocument();
	});

	test("should update TextArea value and call onChange handler on typing", async () => {
		const onChange = jest.fn();
		render(
			<TextArea
				placeholder='Enter description'
				name='description'
				onChange={onChange}
				value=''
				touched={true}
				errors=''
			/>
		);

		const textAreaElement = screen.getByPlaceholderText("Enter description");
		expect(textAreaElement).toHaveValue("");
		await userEvent.type(textAreaElement, "test");
		expect(onChange).toHaveBeenCalledTimes(4);
	});
});
