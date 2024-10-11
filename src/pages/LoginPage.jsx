import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data); // Set user data after successful login
      setRedirect(true); // Redirect after successful login
    } catch (e) {
      console.error("Login error:", e);
      if (e.response && e.response.status === 401) {
        alert("Invalid credentials, please try again.");
      } else {
        alert(
          "Login failed. Please check your network connection and try again."
        );
      }
    }
  }

  // If redirect is true, navigate to the homepage
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Type your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required // Add required attribute for email validation
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required // Add required attribute for password validation
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Have no account yet?
            <Link className="underline text-blue" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
