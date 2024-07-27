import {
	addDoc,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
} from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/add/addRecipe/AddRecipe";
import { db } from "../firebase/firebaseConfig";
import { Recipe } from "../types/editRecipe";

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

const update = async (docId: string, updatedData: Omit<Recipe, "id">) => {
	const docRef = doc(db, "recipes", docId);
	await updateDoc(docRef, updatedData);
};

export const recipeApi = {
	add,
	getAll,
	update,
};
