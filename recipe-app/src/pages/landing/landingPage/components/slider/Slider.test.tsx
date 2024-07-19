import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Slider from "./Slider";

describe("Slider Component", () => {
	test("renders without crashing", () => {
		render(<Slider />);
		expect(screen.getByText("Recipe App")).toBeInTheDocument();
	});

	test("displays the correct image and text", () => {
		render(<Slider />);
		expect(screen.getByText("Recipe App")).toBeInTheDocument();
		expect(screen.getByAltText("image 1")).toBeInTheDocument();
	});

	test("navigates to the next slide", async () => {
		render(<Slider />);
		await userEvent.click(screen.getByLabelText("next"));
		expect(screen.getByText("Dodawaj Przepisy")).toBeInTheDocument();
	});

	test("navigates to the previous slide", async () => {
		render(<Slider />);
		await userEvent.click(screen.getByLabelText("prev"));
		expect(screen.getByText("Dodaj swój plan żywnościowy")).toBeInTheDocument();
	});

	test("loops back to the first slide after the last slide", async () => {
		render(<Slider />);
		await userEvent.click(screen.getByLabelText("next"));
		await userEvent.click(screen.getByLabelText("next"));
		await userEvent.click(screen.getByLabelText("next"));
		expect(screen.getByText("Recipe App")).toBeInTheDocument();
	});

	test("loops back to the last slide from the first slide", async () => {
		render(<Slider />);
		await userEvent.click(screen.getByLabelText("prev"));
		expect(screen.getByText("Dodaj swój plan żywnościowy")).toBeInTheDocument();
	});
});
