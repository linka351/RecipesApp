import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Recipes from "../recipes/Recipes";
import MealPlans from "../mealPlans/MealPlans";
import LandingPage from "../../landing/landingPage/LandingPage";
import AddRecipe from "../addRecipe/AddRecipe";
import AddMealPlan from "../addMealPlan/AddMealPlan";

import "./main.scss";
import App from "../app/App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/app",
		element: <App />,
	},
	{
		path: "/app/add-meal-plan",
		element: <AddMealPlan />,
	},
	{
		path: "/app/add-recipe",
		element: <AddRecipe />,
	},
	{
		path: "app/recipes",
		element: <Recipes />,
	},
	{
		path: "app/meal-plans",
		element: <MealPlans />,
	},
]);

function Main() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default Main;
