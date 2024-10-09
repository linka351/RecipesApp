import {
	addDoc,
	collection,
	getDocs,
	query,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
} from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/recipesForm/RecipesForm";
import { db } from "../firebase/firebaseConfig";
import { Recipe } from "../types/editRecipe";
import { WeeklyPlan } from "../pages/app/mealPlans/add/addMealPlan/types";

const add = async (values: FormValues) => {
	return addDoc(collection(db, "recipes"), values);
};

const update = async (docId: string, updatedData: Omit<Recipe, "id">) => {
	const docRef = doc(db, "recipes", docId);
	await updateDoc(docRef, updatedData);
};

const getById = async (id: string) => {
	const documentReference = doc(db, "recipes", id);
	const documentSnapshot = await getDoc(documentReference);

	return { id: documentSnapshot.id, ...documentSnapshot.data() } as Recipe;
};

const getMealPlanById = async (id: string) => {
	const documentReference = doc(db, "mealPlans", id);
	const documentSnapshot = await getDoc(documentReference);

	return { id: documentSnapshot.id, ...documentSnapshot.data() } as WeeklyPlan;
};

const remove = async (id: string) => {
	const documentReference = doc(db, "recipes", id);
	await deleteDoc(documentReference);
};

const getAll = async () => {
	const q = query(collection(db, "recipes"));
	const snapShot = await getDocs(q);
	return snapShot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Recipe[];
};

const getAllWeeklyPlans = async () => {
	const q = query(collection(db, "mealPlans"));
	const snapShot = await getDocs(q);
	return snapShot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as WeeklyPlan[];
};

const addMealPlan = async (mealPlan: WeeklyPlan) => {
	return addDoc(collection(db, "mealPlans"), mealPlan);
};

const updateMealPlan = async (
	docId: string,
	updatedData: Omit<WeeklyPlan, "id">
) => {
	const docRef = doc(db, "mealPlans", docId);
	await updateDoc(docRef, updatedData);
};

export const recipeApi = {
	add,
	getAll,
	update,
	getById,
	remove,
	addMealPlan,
	updateMealPlan,
	getMealPlanById,
	getAllWeeklyPlans,
};
