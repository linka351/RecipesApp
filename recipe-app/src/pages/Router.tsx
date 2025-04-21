import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import Recipes from "./app/recipes/Recipes";
import MealPlans from "./app/mealPlans/MealPlans";
import AddRecipe from "./app/recipes/add/addRecipe/AddRecipe";
import AddMealPlan from "./app/mealPlans/add/addMealPlan/AddMealPlan";
import EditMealPlan from "./app/mealPlans/edit/editMealPlan/EditMealPlan";
import DetailsRecipe from "./app/recipes/details/DetailsRecipe";
import LandingPage from "./landing/landingPage/LandingPage";
import Edit from "./app/recipes/edit/Edit";
import Layout from "../components/layout/Layout";

import SignUp from "./app/registration/SignUp";
import SignIn from "./app/registration/SignIn";
import { AuthProvider } from "../context/AuthContext";
import { Protected } from "./app/registration/Protected";

import "./router.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},

	{
		element: <Layout />,
		children: [
			{
				path: "/sign-up",
				element: <SignUp />,
			},
			{
				path: "/sign-in",
				element: <SignIn />,
			},
			{
				element: <Protected />,
				children: [
					{
						path: "/app",
						element: <Navigate to='/app/recipes' replace />,
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
						path: "/app/recipes/details/:id",
						element: <DetailsRecipe />,
					},
					{
						path: "/app/recipes/edit/:id",
						element: <Edit />,
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
		],
	},
]);
function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
