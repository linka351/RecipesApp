import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useFormik } from "formik";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import "./registration.scss";

type FormValues = {
	email: string;
	password: string;
};

function SignIn() {
	const navigate = useNavigate();
	const { handleLoginWithEmail } = useAuth();

	const formik = useFormik<FormValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Required"),
			password: Yup.string()
				.min(6, "Password must be at least 6 characters")
				.required("Required"),
		}),
		onSubmit: async (values, { resetForm, setStatus }) => {
			try {
				await handleLoginWithEmail(values.email, values.password);
				navigate("/app/recipes");
				resetForm();
			} catch (error) {
				setStatus("Nieprawidłowy email lub hasło.");
				console.error(error);
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
				/>

				<Button className='registration-button' type='submit'>
					Zaloguj Się
				</Button>

				{formik.status && (
					<div className='registration-form-error'>{formik.status}</div>
				)}
			</form>
		</div>
	);
}

export default SignIn;
