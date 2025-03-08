import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { handleRegisterWithEmail } = useAuth();

  async function handleSignIn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleRegisterWithEmail(email, password)
      .then((user) => {
        console.log(user);
        navigate("/app");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form action="#">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSignIn(e)}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
