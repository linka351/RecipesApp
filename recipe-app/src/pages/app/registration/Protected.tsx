import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function Protected() {
	const { user } = useAuth();
	const location = useLocation();

	if (user) {
		return <Outlet />;
	}

	console.log(user);

	if (location.pathname === "/sign-in" || location.pathname === "/sign-up") {
		return <Outlet />;
	}
	return <Navigate to='/' replace />;
}
