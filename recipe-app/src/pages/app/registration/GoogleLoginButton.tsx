import { useLocation } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import { useAuth } from "../../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
	const { handleRegisterWithGoogle, handleLoginWithGoogle } = useAuth();
	const location = useLocation();

	return location.pathname === "/sign-up" ? (
		<Button
			onClick={handleRegisterWithGoogle}
			className='google-button'
			type='button'>
			<FcGoogle className='google-icon' />
			KONTYNUUJ Z GOOGLE
		</Button>
	) : (
		<Button
			onClick={handleLoginWithGoogle}
			className='google-button'
			type='button'>
			<FcGoogle className='google-icon' />
			KONTYNUUJ Z GOOGLE
		</Button>
	);
};

export default GoogleLoginButton;
