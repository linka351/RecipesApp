import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function Protected() {
	const { user } = useAuth();
	const location = useLocation();

	console.log("prot");
	console.log(location.pathname);

	if (!user) {
		if (location.pathname === "/sign-in") {
			return <Outlet />;
		} else {
			return <Navigate to='/' replace />;
		}
	} else {
		return <Outlet />;
	}
}
