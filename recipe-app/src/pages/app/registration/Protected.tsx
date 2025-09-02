import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ROUTE } from "../../../constants/routes.const";

export function Protected() {
	const { user } = useAuth();
	const location = useLocation();

	if (!user) {
		if (
			location.pathname === ROUTE.SIGN_IN ||
			location.pathname === ROUTE.SIGN_UP
		) {
			return <Outlet />;
		} else {
			return <Navigate to={ROUTE.LANDING} replace />;
		}
	} else {
		return <Outlet />;
	}
}
