import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Footer", () => {
	test("renders logo", () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const logoIcon = screen.getByLabelText("home");
		expect(logoIcon).toBeInTheDocument();
	});

	test("renders text", () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const textElement = screen.getByText(/© 2024 Recipe App/i);
		expect(textElement).toBeInTheDocument();
	});

	test("renders social links", () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const githubLink = screen.getByLabelText("github");
		const linkedinLink = screen.getByLabelText("linkedin");

		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute("href", "https://github.com/linka351");

		expect(linkedinLink).toBeInTheDocument();
		expect(linkedinLink).toHaveAttribute(
			"href",
			"https://www.linkedin.com/in/kamil-linka-1a4052219/"
		);
	});
});
