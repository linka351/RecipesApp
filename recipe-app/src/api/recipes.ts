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
} from "firebase/firestore";
import { FormValues } from "../pages/app/recipes/recipesForm/RecipesForm";
import { db } from "../firebase/firebaseConfig";
import { Recipe } from "../types/editRecipe";
import { getAuth } from "firebase/auth";

const getUserRole = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) return "user";

	const docRef = doc(db, "users", user.uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data().role;
	} else {
		return "user";
	}
};

const add = async (values: FormValues) => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return;
	}

	const role = await getUserRole();
	const isPublic = role === "admin";
	return addDoc(collection(db, "recipes"), {
		...values,
		userId: user.uid,
		isPublic,
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

	const privateQuery = query(
		collection(db, "recipes"),
		where("userId", "==", user.uid)
	);

	const publicQuery = query(
		collection(db, "recipes"),
		where("isPublic", "==", true)
	);

	const [privateSnap, publicSnap] = await Promise.all([
		getDocs(privateQuery),
		getDocs(publicQuery),
	]);

	const privateRecipes = privateSnap.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Recipe[];

	const publicRecipes = publicSnap.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Recipe[];

	return [...privateRecipes, ...publicRecipes];
};

export const recipeApi = {
	add,
	getAll,
	update,
	get,
	remove,
};
