import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function Public() {
	const { user } = useAuth();

	if (!user) {
		return <Outlet />;
	} else {
		return <Navigate to='/app/recipes' replace />;
	}
}
