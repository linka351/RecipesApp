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

const add = async (values: FormValues) => {
	return addDoc(collection(db, "recipes"), values);
};
const getAll = async () => {
	const q = query(collection(db, "recipes"));
	const snapShot = await getDocs(q);
	const recipes: any[] = [];

	snapShot.forEach(doc => {
		recipes.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return recipes;
};

type RecipeUpdateData = {
	[key: string]: any;
};

const updateRecipe = async (docId: string, updatedData: RecipeUpdateData) => {
	const docRef = doc(db, "recipes", docId);
	await updateDoc(docRef, updatedData);
	console.log("Document successfully updated!");
};

export const recipeApi = {
	add,
	getAll,
	updateRecipe,
};
