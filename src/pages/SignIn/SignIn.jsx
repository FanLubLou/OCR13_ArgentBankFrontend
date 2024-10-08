import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setRememberMe, resetError } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Composant SignIn pour la connexion des utilisateurs.
 * 
 * @returns {JSX.Element} Le rendu du composant SignIn.
 */
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, remember } = useSelector((state) => state.auth); 
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMeState] = useState(remember); 
  const [formError, setFormError] = useState(""); 

  useEffect(() => {
    dispatch(resetError()); 
  }, [dispatch]);

  /**
   * Gère l'envoi du formulaire de connexion..
   * @param {React.FormEvent<HTMLFormElement>} e - L'évenement d'envoi du formulaire.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setRememberMe(rememberMe)); 
    if (!email || !password) { 
      setFormError("Please fill in both fields.");
      return;
    }
    dispatch(loginUser({ email, password }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/User");
        } else {
          setFormError("Invalid email or password."); 
        }
      });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username_Email</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMeState(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Sign In"}
          </button>
          {formError && <p>{formError}</p>} {/* Display form error */}
          {/* {error && <p>{error.message}</p>} Display API error */}
        </form>
      </section>
    </main>
  );
}
