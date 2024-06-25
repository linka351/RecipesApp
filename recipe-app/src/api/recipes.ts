import { addDoc, collection } from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/add/addRecipe/AddRecipe"; //../pages/addRecipe/AddRecipe
import { db } from "../firebase/firebaseConfig";

const add = async (values: FormValues) => {
	return addDoc(collection(db, "recipes"), values);
};

export const recipeApi = {
	add,
};
