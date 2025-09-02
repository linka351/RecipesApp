import { useLocation } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import { useAuth } from "../../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { ROUTE } from "../../../constants/routes.const";

const GoogleLoginButton = () => {
	const { handleRegisterWithGoogle, handleLoginWithGoogle } = useAuth();
	const location = useLocation();

	const action =
		location.pathname === ROUTE.SIGN_UP
			? handleRegisterWithGoogle
			: handleLoginWithGoogle;
	return (
		<Button onClick={action} className='google-button' type='button'>
			<FcGoogle className='google-icon' />
			KONTYNUUJ Z GOOGLE
		</Button>
	);
};

export default GoogleLoginButton;
