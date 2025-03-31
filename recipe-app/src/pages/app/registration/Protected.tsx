import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function Protected() {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
			return <Outlet />;
		} else {
			return <Navigate to='/' replace />;
		}
	} else {
		return <Outlet />;
	}
}
