import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./components/main/Main";
import Recipes from "./components/recipes/Recipes";
import MealPlans from "./components/mealPlans/MealPlans";
import LandingPage from "./components/landingPage/LandingPage";
import AddRecipe from "./components/addRecipe/AddRecipe";
import AddMealPlan from "./components/addMealPlan/AddMealPlan";

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
		path: "/main/addMealPlan",
		element: <AddMealPlan />,
	},
	{
		path: "/main/addRecipe",
		element: <AddRecipe />,
	},
	{
		path: "/recipes",
		element: <Recipes />,
	},
	{
		path: "/mealPlans",
		element: <MealPlans />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
