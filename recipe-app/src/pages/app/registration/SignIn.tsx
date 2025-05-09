import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useFormik } from "formik";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import "./registration.scss";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { firebaseErrorMessages } from "../../../firebase/firebaseErrors";
import GoogleLoginButton from "./GoogleLoginButton";

type FormValues = {
	email: string;
	password: string;
};

const validationSchema = Yup.object({
	email: Yup.string().required("Adres email jest wymagany"),
	password: Yup.string().required("Hasło jest wymagane"),
});

function SignIn() {
	const [serverError, setServerError] = useState("");

	const { handleLoginWithEmail } = useAuth();

	const formik = useFormik<FormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				await handleLoginWithEmail(values.email, values.password);
				resetForm();
			} catch (error) {
				const firebaseError = error as FirebaseError;
				const errorCode = firebaseError.code;
				const message =
					firebaseErrorMessages[errorCode] ||
					"Wystąpił nieznany błąd. Spróbuj ponownie.";
				setServerError(message);
			}
		},
	});

	return (
		<div className='registration-container'>
			<div className='registration-image'>
				<div className='registration-text'>
					<h2 className='image-header'>Witamy ponownie w naszej aplikacji!</h2>
					<p>
						🥗🍲 To tutaj z łatwością stworzysz swoje ulubione przepisy i
						zaplanujesz tygodniowe menu. Zarządzaj swoimi posiłkami, twórz listy
						dań i ciesz się dobrze zorganizowanym planem żywieniowym. Smacznego
						planowania! 😊
					</p>
				</div>
			</div>
			<form className='registration-form' onSubmit={formik.handleSubmit}>
				<div className='login'>
					<p>Nie masz jeszcze konta?</p>
					<Link to={"/sign-up"} className='login-link'>
						Zarejestruj Się
					</Link>
				</div>
				<h1 className='registration-header'>Zaloguj Się</h1>
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
					Zaloguj Się
				</Button>
				<p className='login-method'>lub</p>
				<GoogleLoginButton />
				{formik.status && (
					<div className='registration-form-error'>{formik.status}</div>
				)}
			</form>
		</div>
	);
}

export default SignIn;
