import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
} from "firebase/firestore";
import { WeeklyPlan } from "../pages/app/mealPlans/add/addMealPlan/types";
import { db } from "../firebase/firebaseConfig";

const add = async (mealPlan: WeeklyPlan) => {
	return addDoc(collection(db, "mealPlans"), mealPlan);
};

const update = async (docId: string, updatedData: Omit<WeeklyPlan, "id">) => {
	const docRef = doc(db, "mealPlans", docId);
	await updateDoc(docRef, updatedData);
};

const getAll = async () => {
	const q = query(collection(db, "mealPlans"));
	const snapShot = await getDocs(q);
	return snapShot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as WeeklyPlan[];
};

const get = async (id: string) => {
	const documentReference = doc(db, "mealPlans", id);
	const documentSnapshot = await getDoc(documentReference);

	return { id: documentSnapshot.id, ...documentSnapshot.data() } as WeeklyPlan;
};

const remove = async (id: string) => {
	const documentReference = doc(db, "mealPlans", id);
	await deleteDoc(documentReference);
};

export const mealPlansApi = {
	add,
	getAll,
	update,
	get,
	remove,
};
