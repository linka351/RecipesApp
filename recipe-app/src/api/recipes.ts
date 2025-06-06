import {
	addDoc,
	collection,
	getDocs,
	query,
	deleteDoc,
	doc,
	getDoc,
	updateDoc,
	where,
	or,
} from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/recipesForm/RecipesForm";
import { db } from "../firebase/firebaseConfig";
import { Recipe } from "../types/editRecipe";
import { getAuth } from "firebase/auth";
import { STATUS } from "../constants/status.const";

const add = async (values: FormValues) => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return;
	}

	return addDoc(collection(db, "recipes"), {
		...values,
	});
};

const update = async (docId: string, updatedData: Omit<Recipe, "id">) => {
	const docRef = doc(db, "recipes", docId);
	await updateDoc(docRef, updatedData);
};

const get = async (id: string) => {
	const documentReference = doc(db, "recipes", id);
	const documentSnapshot = await getDoc(documentReference);

	return { id: documentSnapshot.id, ...documentSnapshot.data() } as Recipe;
};

const remove = async (id: string) => {
	const documentReference = doc(db, "recipes", id);
	await deleteDoc(documentReference);
};

const getAll = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return [];
	}

	const recipesQuery = query(
		collection(db, "recipes"),
		or(where("userId", "==", user.uid), where("status", "==", STATUS.PUBLIC))
	);

	const snapshot = await getDocs(recipesQuery);
	return snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Recipe[];
};

export const recipeApi = {
	add,
	getAll,
	update,
	get,
	remove,
};
