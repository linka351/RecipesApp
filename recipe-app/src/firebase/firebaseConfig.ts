import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.RECIPES_APP_API_KEY,
	authDomain: "recipesapp-334f3.firebaseapp.com",
	projectId: "recipesapp-334f3",
	storageBucket: "recipesapp-334f3.appspot.com",
	messagingSenderId: "584226107976",
	appId: "1:584226107976:web:3e930ac28f5a6c8cfbde7d",
	measurementId: "G-RW7E7E8SZR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
