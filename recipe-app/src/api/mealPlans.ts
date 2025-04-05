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
} from "firebase/firestore";
import { WeeklyPlan } from "../pages/app/mealPlans/add/addMealPlan/types";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const add = async (mealPlan: WeeklyPlan) => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return;
	}

	const role = await getUserRole();
	const isPublic = role === "admin";

	return addDoc(collection(db, "mealPlans"), {
		...mealPlan,
		userId: user.uid,
		isPublic,
	});
};

const update = async (docId: string, updatedData: Omit<WeeklyPlan, "id">) => {
	const docRef = doc(db, "mealPlans", docId);
	await updateDoc(docRef, updatedData);
};

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

const getAll = async () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		console.error("Użytkownik nie jest zalogowany.");
		return [];
	}

	const userPlansQuery = query(
		collection(db, "mealPlans"),
		where("userId", "==", user.uid)
	);
	const userPlansSnap = await getDocs(userPlansQuery);

	const publicPlansQuery = query(
		collection(db, "mealPlans"),
		where("isPublic", "==", true)
	);
	const publicPlansSnap = await getDocs(publicPlansQuery);

	const userPlans = userPlansSnap.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as WeeklyPlan[];
	const publicPlans = publicPlansSnap.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as WeeklyPlan[];

	return [...userPlans, ...publicPlans];
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
	getUserRole,
};
