import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { ROUTE } from "../../../constants/routes.const";

export function Public() {
	const { user } = useAuth();

	if (!user) {
		return <Outlet />;
	} else {
		return <Navigate to={`${ROUTE.RECIPES}`} replace />;
	}
}
