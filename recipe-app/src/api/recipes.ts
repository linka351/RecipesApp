import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/add/addRecipe/AddRecipe";
import { db } from "../firebase/firebaseConfig";
import { Recipe } from "../types/editRecipe";
import { MealPlan } from "../pages/app/mealPlans/add/addMealPlan/AddMealPlan";

const add = async (values: FormValues) => {
	return addDoc(collection(db, "recipes"), values);
};

const getAll = async () => {
	const q = query(collection(db, "recipes"));
	const snapShot = await getDocs(q);
	return snapShot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Recipe[];
};

const addMealPlan = async (mealPlan: MealPlan) => {
	return addDoc(collection(db, "mealPlans"), mealPlan);
};

export const recipeApi = {
	add,
	getAll,
	addMealPlan,
};
