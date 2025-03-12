import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthContext";
import "./registration.scss";
import Input from "../../../components/inputs/Input";
import Button from "../../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
	const { handleRegisterWithEmail } = useAuth();
	const navigate = useNavigate();

	const formik = useFormik({
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
		//walidacja do poprawy przeniesc ja do innego miejsca?
		onSubmit: async (values, { resetForm }) => {
			try {
				const user = await handleRegisterWithEmail(
					values.email,
					values.password
				);
				console.log(user);
				navigate("/app");
				resetForm();
			} catch (error) {
				console.error(error);
			}
		},
	});

	return (
		<div className='registration-container'>
			<form className='registration-form' onSubmit={formik.handleSubmit}>
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
				/>
				{formik.touched.email && formik.errors.email ? (
					<div style={{ color: "red", marginBottom: "10px" }}>
						{formik.errors.email}
					</div>
				) : null}
				<Input
					inputClassName='registration-input'
					label='Password'
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.touched.password && formik.errors.password ? (
					<div style={{ color: "red", marginBottom: "10px" }}>
						{formik.errors.password}
					</div>
				) : null}
				{/*poprawic errory */}
				<Button className='registration-button' type='submit'>
					Zaloguj Się
				</Button>
				<div className='login'>
					<p>Masz już konto?</p>{" "}
					<Link to={"/sign-in"} className='login-link'>
						Zaloguj Się
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SignUp;
