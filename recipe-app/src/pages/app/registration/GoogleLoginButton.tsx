import Button from "../../../components/buttons/Button";
import { useAuth } from "../../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
	const { handleLoginWithGoogle } = useAuth();

	return (
		<Button onClick={handleLoginWithGoogle} className='google-registration'>
			<FcGoogle />
			KONTYNUUJ Z GOOGLE
		</Button>
	);
};

export default GoogleLoginButton;
