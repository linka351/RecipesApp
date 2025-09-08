import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
	test("renders logo", () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const logoElement = screen.getByText(/RecipesApp/i);
		expect(logoElement).toBeInTheDocument();
	});

	test("opens and closes menu", async () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const user = userEvent.setup();
		const menuButton = screen.getByRole("button");

		expect(screen.getByRole("navigation")).toHaveClass("ofcanvas-menu");

		await user.click(menuButton);
		expect(screen.getByRole("navigation")).toHaveClass("ofcanvas-menu active");

		await user.click(menuButton);
		expect(screen.getByRole("navigation")).not.toHaveClass(
			"ofcanvas-menu active"
		);
	});

	test("navigates to pages", async () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);
		const user = userEvent.setup();

		const homeLink = screen.getByRole("link", { name: /Strona Główna/i });
		const recipesLink = screen.getByRole("link", { name: /Przepisy/i });
		const addRecipeLink = screen.getByRole("link", { name: /Dodaj Przepis/i });

		expect(homeLink).toBeInTheDocument();
		expect(recipesLink).toBeInTheDocument();
		expect(addRecipeLink).toBeInTheDocument();

		await user.click(homeLink);
		expect(window.location.pathname).toBe("/");

		await user.click(recipesLink);
		expect(window.location.pathname).toBe("/app/recipes");

		await user.click(addRecipeLink);
		expect(window.location.pathname).toBe("/app/recipes/add");
	});
});
