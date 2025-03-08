import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import Recipes from "../recipes/Recipes";
import MealPlans from "../mealPlans/MealPlans";
import AddRecipe from "../recipes/add/addRecipe/AddRecipe";
import AddMealPlan from "../mealPlans/add/addMealPlan/AddMealPlan";
import EditMealPlan from "../mealPlans/edit/editMealPlan/EditMealPlan";
import LandingPage from "../../landing/landingPage/LandingPage";
import Edit from "../recipes/edit/Edit";
import Layout from "../../../components/layout/Layout";

import "./main.scss";
import SignUp from "../registration/SignUp";
import SignIn from "../registration/SignIn";
import { AuthProvider } from "../../../context/AuthContext";
import { Protected } from "../registration/Protected";

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
				path: "/app",
				element: (
					<Protected>
						<Navigate to='/app/recipes' replace />,
					</Protected>
				),
			},

			{
				path: "/app/recipes",

				element: (
					<Protected>
						<Recipes />,
					</Protected>
				),
			},
			{
				path: "/app/recipes/add",

				element: (
					<Protected>
						<AddRecipe />,
					</Protected>
				),
			},
			{
				path: "/app/recipes/edit/:id",

				element: (
					<Protected>
						<Edit />,
					</Protected>
				),
			},
			{
				path: "/app/meal-plans",

				element: (
					<Protected>
						<MealPlans />,
					</Protected>
				),
			},
			{
				path: "/app/meal-plans/add",

				element: (
					<Protected>
						<AddMealPlan />,
					</Protected>
				),
			},
			{
				path: "/app/meal-plans/edit/:id",

				element: (
					<Protected>
						<EditMealPlan />,
					</Protected>
				),
			},
		],
	},
]);

function Main() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />;
		</AuthProvider>
	);
}

export default Main;
