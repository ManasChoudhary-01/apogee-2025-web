import React, { useState, useEffect } from "react";
import * as styles from "./Quantaculus.module.scss";

const Login = ({ onLoginSuccess, onLoginError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password feature
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token on component mount
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
      onLoginSuccess();
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
      // (e.g., call an API to validate the token or refresh it)
      onLoginSuccess();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!username || !password) {
        setErrorMessage("Please enter both username and password.");
        return;
      }

      const response = await fetch(
        "https://bits-apogee.org/2025/main/quanta/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid credentials");
        onLoginError(errorData);
      } else {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem("jwtToken", data.token);
        // console.log('tkn added')
        onLoginSuccess();
      }
    } catch (error) {
      setErrorMessage(error);
      onLoginError(error);
    }
  };

  return (
    <div className={styles.loginBox}>
      <h1>LOGIN</h1>
      <h3>Enter your details to sign in to your account</h3>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className={styles.passlabel}>
          <div className={styles.label}>Password</div>
          <div className={styles.showPassword}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <input type="submit" value="Login" className={styles.submit} />
      </form>
    </div>
  );
};

export default Login;
