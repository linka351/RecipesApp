import { MouseEvent, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const auth = getAuth();

	async function handleSignIn(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then(user => {
				console.log(user);
				navigate("/app");
			})
			.catch(error => {
				console.log(error);
			});

	}
	return (
		<div>
			<h1>Sign In</h1>
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
				<button onClick={e => handleSignIn(e)}>Sign In</button>
			</form>
		</div>
	);
}

export default SignIn;
