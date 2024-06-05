import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./pages/main/Main";
import Recipes from "./pages/recipes/Recipes";
import MealPlans from "./pages/mealPlans/MealPlans";
import LandingPage from "./pages/landingPage/LandingPage";
import AddRecipe from "./pages/addRecipe/AddRecipe";
import AddMealPlan from "./pages/addMealPlan/AddMealPlan";

import "./app.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/main",
		element: <Main />,
	},
	{
		path: "/main/add-meal-plan",
		element: <AddMealPlan />,
	},
	{
		path: "/main/add-recipe",
		element: <AddRecipe />,
	},
	{
		path: "/recipes",
		element: <Recipes />,
	},
	{
		path: "/meal-plans",
		element: <MealPlans />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
