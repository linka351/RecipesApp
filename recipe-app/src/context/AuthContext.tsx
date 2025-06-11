import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
	useCallback,
} from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { userApi } from "../api/user";
import { User } from "../types/user";
import { USER_ROLE } from "../constants/user.const";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

type AuthContextType = {
	user: User | null;
	handleRegisterWithEmail: (
		email: string,
		password: string
	) => Promise<UserCredential>;
	handleLoginWithEmail: (
		email: string,
		password: string
	) => Promise<UserCredential>;
	handleSignOut: () => Promise<void>;
	handleRegisterWithGoogle: () => Promise<void>;
	handleLoginWithGoogle: () => Promise<void>;
	handleLoginAsDemo: () => Promise<void>;
};

const Context = createContext<AuthContextType | undefined>(undefined);

type Props = {
	children: ReactNode;
};

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export function AuthProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async currentUser => {
			if (currentUser) {
				const userData = await userApi.get(currentUser.uid);

				if (userData) {
					setUser(userData as User);
				} else {
					setUser(null);
				}
			} else {
				setUser(null);
			}

			setLoading(false);
		});

		return () => unsubscribe();
	}, [auth]);

	const handleRegisterWithEmail = useCallback(
		async (email: string, password: string) => {
			try {
				const authData = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

				const userData: User = {
					id: authData.user.uid,
					email: authData.user.email || "",
					role: USER_ROLE.USER,
				};

				await userApi.add(userData);

				return authData;
			} catch (error: any) {
				console.error(error);

				throw error;
			}
		},
		[auth]
	);

	const handleLoginWithEmail = useCallback(
		async (email: string, password: string) => {
			try {
				return await signInWithEmailAndPassword(auth, email, password);
			} catch (error: any) {
				console.log(error);
				throw error;
			}
		},
		[auth]
	);

	const handleRegisterWithGoogle = useCallback(async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const userData: User = {
				id: user.uid,
				email: user.email || "",
				role: USER_ROLE.USER,
			};
			toast.success("Zarejestrowano pomyślnie");
			await userApi.add(userData);
		} catch (error) {
			console.error("Google register error:", error);
			toast.error("Wystąpił błąd podczas rejestracji");
		}
	}, []);
	const handleLoginWithGoogle = useCallback(async () => {
		try {
			await signInWithPopup(auth, provider);
			toast.success("Zalogowano pomyślnie");
		} catch (error) {
			toast.error("Wystąpił błąd podczas logowania");
		}
	}, [auth]);

	const handleLoginAsDemo = useCallback(async () => {
		try {
			await signInWithEmailAndPassword(auth, "demo@example.com", "Demo1!");
			toast.success("Zalogowano jako użytkownik demo");
		} catch (error) {
			toast.error("Nie udało się zalogować jako demo");
		}
	}, []);

	const handleSignOut = useCallback(() => signOut(auth), []);

	const values: AuthContextType = {
		user,
		handleRegisterWithEmail,
		handleLoginWithEmail,
		handleSignOut,
		handleRegisterWithGoogle,
		handleLoginWithGoogle,
		handleLoginAsDemo,
	};

	return (
		<Context.Provider value={values}>{!loading && children}</Context.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
