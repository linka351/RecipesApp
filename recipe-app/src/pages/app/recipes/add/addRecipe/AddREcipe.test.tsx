import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddRecipe from "./AddRecipe";

jest.mock("../../../../../api/recipes", () => ({
  recipeApi: {
    add: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

// test("renders the form with initial elements", () => {
// 	render(<AddRecipe />);

// 	expect(screen.getByPlaceholderText("Nazwa przepisu")).toBeInTheDocument();
// 	expect(
// 		screen.getByPlaceholderText("Krótki opis przepisu")
// 	).toBeInTheDocument();
// 	expect(screen.getByLabelText(/Dodaj Instrukcje/)).toBeInTheDocument();
// 	expect(screen.getByLabelText(/Dodaj Składnik/)).toBeInTheDocument();
// 	expect(screen.getByRole("button", { name: "Zapisz" })).toBeInTheDocument();
// });

// test("displays validation errors", async () => {
// 	render(<AddRecipe />);

// 	await userEvent.click(screen.getByRole("button", { name: "Zapisz" }));

// 	expect(screen.getByText("Nazwa przepisu jest wymagana")).toBeInTheDocument();
// 	expect(screen.getByText("Opis przepisu jest wymagany")).toBeInTheDocument();
// });

test("allows the user to remove an instruction", async () => {
  render(<AddRecipe />);

  const instructionInput = screen.getByLabelText("Dodaj Instrukcje");
  await userEvent.type(
    screen.getByPlaceholderText("Nazwa przepisu"),
    "Test Recipe"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Krótki opis przepisu"),
    "Test Recipe Description"
  );

  for (let index = 0; index < 3; index++) {
    await userEvent.type(
      screen.getByLabelText("Dodaj Instrukcje"),
      "Test Instruction " + (index + 1)
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Add Instruction" })
    );
  }

  for (let index = 0; index < 3; index++) {
    await userEvent.type(
      screen.getByLabelText("Dodaj Składnik"),
      "Test  Ingredient" + (index + 1)
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Add Ingredient" })
    );
  }

  await userEvent.click(screen.getByRole("button", { name: "Zapisz" }));


  // const removeButtons = screen.getAllByRole("button", { name: "Remove" });
  // await userEvent.click(removeButtons[0]);
  // screen.debug();

  // expect(screen.queryByText("Test Instruction")).not.toBeInTheDocument();
});

// test("allows the user to remove an ingredient", async () => {
// 	render(<AddRecipe />);
// 	const ingredientInput = screen.getByLabelText("Dodaj Składniki");
// 	await userEvent.type(ingredientInput, "Test Ingredient");
// 	await userEvent.click(screen.getByRole("button", { name: "Add" }));

// 	const removeButtons = screen.getAllByRole("button", { name: "Remove" });
// 	await userEvent.click(removeButtons[0]);

// 	expect(screen.queryByText("Test Ingredient")).not.toBeInTheDocument();
// });
