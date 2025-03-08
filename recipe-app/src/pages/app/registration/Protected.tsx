import { useContext, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../../../context/AuthContext";


export function Protected() {
	const { user } = useContext(Context) || {};

	console.log('prot');
	

	if (!user) {
		return <Navigate to='/' replace />;
	} else {
		return <Outlet />;
	}
}
