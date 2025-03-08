import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


export function Protected() {
	const { user } = useAuth();

	console.log('prot');
	

	if (!user) {
		return <Navigate to='/' replace />;
	} else {
		return <Outlet />;
	}
}
