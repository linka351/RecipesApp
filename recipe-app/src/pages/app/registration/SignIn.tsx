import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useFormik } from "formik";
import Button from "../../../components/buttons/Button";
import Input from "../../../components/inputs/Input";
import "./registration.scss";

function SignIn() {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { handleLoginWithEmail } = useAuth();

	// async function handleSignIn(e: MouseEvent<HTMLButtonElement>) {
	// 	e.preventDefault();
	// 	handleLoginWithEmail(email, password)
	// 		.then(user => {
	// 			console.log(user);
	// 			navigate("/app");
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// }

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
				const user = await handleLoginWithEmail(values.email, values.password);
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
				<Button className='registration-button' type='submit'>
					Zaloguj Się
				</Button>
				<div className='login'>
					<p>Nie masz jeszcze konta?</p>{" "}
					<Link to={"/sign-up"} className='login-link'>
						Zarejestruj Się
					</Link>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
