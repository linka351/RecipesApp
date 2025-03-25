import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { User } from "../types/user";

const get = async (id: string) => {
	const docRef = doc(db, "users", id);
	const docSnap = await getDoc(docRef);

	return docSnap.data();
};

const add = async (values: User) => {
	return setDoc(doc(db, "users", values.id), values);
};

export const userApi = {
	add,
	get,
};
