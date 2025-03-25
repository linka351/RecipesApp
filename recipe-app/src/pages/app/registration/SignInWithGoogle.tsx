import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase/firebaseConfig";

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;
		console.log("Zalogowano jako:", user.displayName);
		return user;
	} catch (error) {
		console.error("Błąd logowania:", error);
	}
};

// export const logOut = async () => {
// 	try {
// 		await signOut(auth);
// 		console.log("Wylogowano pomyślnie");
// 	} catch (error) {
// 		console.error("Błąd podczas wylogowania:", error);
// 	}
// };
