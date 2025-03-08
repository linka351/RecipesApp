import { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const Context = createContext<AuthContextType | undefined>(undefined);

type Props = {
	children: ReactNode;
};

export function AuthProvider({ children }: Props) {
	const auth = getAuth();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [auth]);

	const values: AuthContextType = { user, setUser };

	return (
		<Context.Provider value={values}>{!loading && children}</Context.Provider>
	);
}
