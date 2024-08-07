import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Recipes from "../recipes/Recipes";
import MealPlans from "../mealPlans/MealPlans";
import AddRecipe from "../recipes/add/addRecipe/AddRecipe";
import AddMealPlan from "../mealPlans/add/addMealPlan/AddMealPlan";
import EditRecipe from "../recipes/edit/editRecipe/EditRecipe";
import EditMealPlan from "../mealPlans/edit/editMealPlan/EditMealPlan";
import LandingPage from "../../landing/landingPage/LandingPage";

import "./main.scss";
import Layout from "../../../components/layout/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		element: <Layout />,
		children: [
			{
				path: "/app",
				element: <Recipes />,
			},

			{
				path: "/app/recipes",
				element: <Recipes />,
			},
			{
				path: "/app/recipes/add",
				element: <AddRecipe />,
			},
			{
				path: "/app/recipes/edit/:id",
				element: <EditRecipe />,
			},
			{
				path: "/app/meal-plans",
				element: <MealPlans />,
			},
			{
				path: "/app/meal-plans/add",
				element: <AddMealPlan />,
			},
			{
				path: "/app/meal-plans/edit/:id",
				element: <EditMealPlan />,
			},
		],
	},
]);

function Main() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer position='top-center' />
		</>
	);
}

export default Main;
