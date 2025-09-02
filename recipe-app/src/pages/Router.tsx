import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";

import Recipes from "./app/recipes/Recipes";
import MealPlans from "./app/mealPlans/MealPlans";
import AddRecipe from "./app/recipes/add/addRecipe/AddRecipe";
import AddMealPlan from "./app/mealPlans/add/addMealPlan/AddMealPlan";
import EditMealPlan from "./app/mealPlans/edit/editMealPlan/EditMealPlan";
import DetailsMealPlans from "./app/mealPlans/details/DetailsMealPlans";
import DetailsRecipe from "./app/recipes/details/DetailsRecipe";
import LandingPage from "./landing/landingPage/LandingPage";
import Edit from "./app/recipes/edit/Edit";
import Layout from "../components/layout/Layout";

import SignUp from "./app/registration/SignUp";
import SignIn from "./app/registration/SignIn";
import { AuthProvider } from "../context/AuthContext";
import { Protected } from "./app/registration/Protected";

import "./router.scss";
import { ROUTE } from "../constants/routes.const";
import { Public } from "./app/registration/Public";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createHashRouter([
	{
		path: ROUTE.LANDING,
		element: <LandingPage />,
	},

	{
		element: <Layout />,
		children: [
			{
				element: <Public />,
				children: [
					{
						path: ROUTE.SIGN_UP,
						element: <SignUp />,
					},
					{
						path: ROUTE.SIGN_IN,
						element: <SignIn />,
					},
				],
			},
			{
				element: <Protected />,
				children: [
					{
						path: ROUTE.APP,
						element: <Navigate to='/app/recipes' replace />,
					},

					{
						path: ROUTE.RECIPES,
						element: <Recipes />,
					},
					{
						path: ROUTE.ADD_RECIPE,
						element: <AddRecipe />,
					},
					{
						path: `${ROUTE.DETAILS_RECIPE}/:id`,
						element: <DetailsRecipe />,
					},
					{
						path: `${ROUTE.EDIT_RECIPE}/:id`,
						element: <Edit />,
					},
					{
						path: ROUTE.MEAL_PLANS,
						element: <MealPlans />,
					},
					{
						path: ROUTE.ADD_MEAL_PLAN,
						element: <AddMealPlan />,
					},
					{
						path: `${ROUTE.DETAILS_MEAL_PLAN}/:id`,
						element: <DetailsMealPlans />,
					},
					{
						path: `${ROUTE.EDIT_MEAL_PLAN}/:id`,
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
			<ToastContainer position='top-right' autoClose={3000} />
		</AuthProvider>
	);
}

export default App;
