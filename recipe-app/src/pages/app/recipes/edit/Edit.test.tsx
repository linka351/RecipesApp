import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Edit from "./Edit";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { recipeApi } from "../../../../api/recipes";
import { editMocks } from "../../../../api/recipesMocks";
jest.mock("../../../../api/recipes", () => ({
	recipeApi: {
		update: jest.fn().mockImplementation(() => Promise.resolve()),
		getById: jest.fn().mockImplementation(() => Promise.resolve(editMocks[0])),
	},
}));

describe("Edit component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders all form fields and buttons", async () => {
		render(
			<BrowserRouter>
				<Edit />
			</BrowserRouter>
		);

		expect(await screen.findByDisplayValue("Recipe name")).toBeInTheDocument();
		expect(screen.getByText("Recipe Description")).toBeInTheDocument();
		expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
		expect(screen.getByText("Instruction 1")).toBeInTheDocument();

		expect(screen.getByText("Zapisz")).toBeInTheDocument();
	});

	test("renders Edit with initial input value and description value and allows user to change it", async () => {
		render(
			<BrowserRouter>
				<Edit />
			</BrowserRouter>
		);

		const nameInput = await screen.findByDisplayValue("Recipe name");
		const descriptionInput = await screen.findByText("Recipe Description");

		expect(nameInput).toBeInTheDocument();
		expect(descriptionInput).toBeInTheDocument();
		expect(nameInput).toHaveValue("Recipe name");
		expect(descriptionInput).toHaveTextContent("Recipe Description");

		await userEvent.clear(nameInput);
		await userEvent.clear(descriptionInput);
		await userEvent.type(nameInput, "New Recipe Name");
		await userEvent.type(descriptionInput, "New Recipe Description");

		expect(nameInput).toHaveValue("New Recipe Name");
		expect(descriptionInput).toHaveTextContent("New Recipe Description");

		const saveButton = screen.getByText("Zapisz");
		await userEvent.click(saveButton);

		expect(recipeApi.update).toHaveBeenCalledWith(
			editMocks[0].id,
			expect.objectContaining({
				name: "New Recipe Name",
				description: "New Recipe Description",
			})
		);
	});
});
