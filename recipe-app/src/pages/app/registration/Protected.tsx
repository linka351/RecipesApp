import { useContext, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../../context/AuthContext";

type Props = {
	children: ReactNode;
};

export function Protected({ children }: Props) {
	const { user } = useContext(Context) || {};

	if (!user) {
		return <Navigate to='/' replace />;
	} else {
		return children;
	}
}
