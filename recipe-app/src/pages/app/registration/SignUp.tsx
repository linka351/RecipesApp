import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import "./registration.scss";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { firebaseErrorMessages } from "../../../firebase/firebaseErrors";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Nieprawidłowy adres email")
		.required("Adres email jest wymagany"),
	password: Yup.string()
		.min(6, "Hasło musi mieć co najmniej 6 znaków")
		.matches(/[A-Z]/, "Hasło musi zawierać co najmniej jedną dużą literę")
		.matches(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
		.matches(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
		.matches(
			/[@$!%*?&#]/,
			"Hasło musi zawierać co najmniej jeden znak specjalny (@, $, !, %, *, ?, &, #)"
		)
		.required("Hasło jest wymagane"),
});

function SignUp() {
	const [serverError, setserverError] = useState("");
	const [isLoaderVisible, setIsLoaderVisible] = useState(false);

	const { handleRegisterWithEmail } = useAuth();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				setIsLoaderVisible(true);
				await handleRegisterWithEmail(values.email, values.password);
				navigate("/app/recipes");
				resetForm();
				toast.success("Rejestracja zakończona sukcesem");
			} catch (error) {
				const firebaseError = error as FirebaseError;
				const message =
					firebaseErrorMessages[firebaseError.code] ||
					"Wystąpił nieznany błąd. Spróbuj ponownie.";
				setserverError(message);
				toast.error("Wystąpił błąd podczas rejestracji");
				setIsLoaderVisible(false);
			}
		},
	});

	return (
		<div className='registration-container'>
			{isLoaderVisible && <Loader />}
			<div className='registration-image'>
				<div className='registration-text'>
					<h2 className='image-header'>Witamy w naszej aplikacji! 👋🍽️</h2>
					<p>
						Zarejestruj się i zacznij tworzyć swoje własne przepisy oraz
						planować tygodniowe menu w prosty i intuicyjny sposób. Ułatw sobie
						organizację posiłków i ciesz się smacznym planowaniem! 😊
					</p>
				</div>
			</div>
			<form className='registration-form' onSubmit={formik.handleSubmit}>
				<div className='login'>
					<p>Masz już konto?</p>{" "}
					<Link to={"/sign-in"} className='login-link'>
						Zaloguj Się
					</Link>
				</div>
				<h1 className='registration-header'>Zarejestruj Się</h1>
				<Input
					inputClassName='registration-input'
					label='Email'
					id='email'
					name='email'
					type='email'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
					touched={formik.touched.email}
					error={formik.errors.email}
					errorClassName='registration-error'
				/>

				<Input
					inputClassName='registration-input'
					label='Password'
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
					touched={formik.touched.password}
					error={formik.errors.password}
					errorClassName='registration-error'
					showPasswordIcon
				/>

				{serverError && <p className='server-error'>{serverError}</p>}

				<Button className='registration-button' type='submit'>
					Zarejestruj Się
				</Button>
				<p className='login-method'>lub</p>
				<GoogleLoginButton />
			</form>
		</div>
	);
}

export default SignUp;
