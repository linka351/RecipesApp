import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { handleLoginWithEmail } = useAuth();


	async function handleSignUp(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		handleLoginWithEmail(email, password)
			.then(user => {
				console.log(user);
			})
			.catch(error => {
				console.log(error);
			});

		alert(email + " " + password);
	}
	return (
		<div>
			<h1>Sign Up</h1>
			<form action='#'>
				<label>Email</label>
				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<label>Password</label>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button onClick={e => handleSignUp(e)}>Sign Up</button>
			</form>
		</div>
	);
}

export default SignUp;
