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
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { userApi } from "../api/user";
import { User } from "../types/user";

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
	handleLoginWithGoogle: () => Promise<void>;
};

const Context = createContext<AuthContextType | undefined>(undefined);

type Props = {
	children: ReactNode;
};

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
			const authData = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const userData: User = {
				id: authData.user.uid,
				email: authData.user.email || "",
			};

			await userApi.add(userData);

			return authData;
		},
		[auth]
	);

	const handleLoginWithEmail = useCallback(
		(email: string, password: string) =>
			signInWithEmailAndPassword(auth, email, password),
		[]
	);

	const handleLoginWithGoogle = useCallback(async () => {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		const userData: User = {
			id: user.uid,
			email: user.email || "",
		};

		await userApi.add(userData);
		setUser(userData);
	}, [auth]);

	const handleSignOut = useCallback(() => signOut(auth), []);

	const values: AuthContextType = {
		user,
		handleRegisterWithEmail,
		handleLoginWithEmail,
		handleSignOut,
		handleLoginWithGoogle,
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
