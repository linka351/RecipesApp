import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
	or,
} from "firebase/firestore";
import { WeeklyPlan } from "../pages/app/mealPlans/add/addMealPlan/types";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { STATUS } from "../constants/status.const";

const add = async (mealPlan: WeeklyPlan) => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return;
	}

	return addDoc(collection(db, "mealPlans"), {
		...mealPlan,
	});
};

const update = async (docId: string, updatedData: Omit<WeeklyPlan, "id">) => {
	const docRef = doc(db, "mealPlans", docId);
	await updateDoc(docRef, updatedData);
};

const getAll = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return [];
	}

	const plansQuery = query(
		collection(db, "mealPlans"),
		or(where("userId", "==", user.uid), where("status", "==", STATUS.PUBLIC))
	);
	const plansSnap = await getDocs(plansQuery);
	return plansSnap.docs.map(doc => ({
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
