import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/User");
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
              onChange={(e) => setEmail(e.target.value)}              
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}                             
            />
        </div>
        <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
        </div>
          <button
            type="submit"
            className="sign-in-button"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Sign In"}
          </button>
          {error && <p>{error.message}</p>}
      </form>
    </section>
    </main>
  )
}
