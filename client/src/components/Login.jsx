import React, { useState } from "react";
import {
  getUserLoggedIn,
  getUserSignUp,
} from "../services/ApiServices/authService";

const loginForm = { username: "", password: "" };
const signUpForm = { username: "", password: "", passwordAgain: "", email: "" };

const Login = ({ setIsLoggedIn = () => {}, setUserInfo = () => {} }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [form, setForm] = useState(() => {
    if (isLoginPage) return loginForm;
    return signUpForm;
  });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleGuestUser = async () => {
    const defaultForm = {
      username: "guest",
      password: "guest",
      userId: "1234",
    };
    setIsLoggedIn(true);
    setUserInfo({ username: "guest", userId: "" });
    await getUserLoggedIn(defaultForm);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    let result = false;
    let userId = "";
    let message = "something went wrong";

    // login
    if (isLoginPage) {
      if (!form.username) {
        alert("Username cannot be empty");
        return;
      }
  
      if (!form.password) {
        alert("Password cannot be empty");
        return;
      }
      const data = await getUserLoggedIn(form);
      result = data.result;
      message = data.message;
      userId = data.userId;
    }
    // singup
    else {
      if (!form.email) {
        alert("Email cannot be empty");
        return;
      }

      if (!validateEmail(form.email)) {
        alert("Invalid email format");
        return;
      }

      if (!form.username) {
        alert("Username cannot be empty");
        return;
      }
  
      if (!form.password) {
        alert("Password cannot be empty");
        return;
      }
      if (!form.passwordAgain) {
        alert("Password Again cannot be empty");
        return;
      }
      
      const usernameInPassword = form.password.toLowerCase().includes(form.username.toLowerCase());
      const emailInPassword = form.password.toLowerCase().includes(form.email.toLowerCase());

      if (usernameInPassword || emailInPassword) {
        alert("Password should not contain the username or email");
        return;
      }

      if (form.password !== form.passwordAgain) {
        alert("Passwords do not match");
        return;
      } else {
        const data = await getUserSignUp(form);
        console.log("Here");
        result = data.result;
        message = data.message;
        userId = data.userId;
      }
    }
    //console.log(result, message)
    if (result) {
      setIsLoggedIn(true);
      setUserInfo({ username: form.username, userId });
      setForm({ username: "", password: "" });
      setIsLoggedIn(true);
      setIsLoginPage(true);
    } else {
      alert("Username or Email already in use Please try again with a different Username and Email.");
    }
  };

  /**
   * JSX
   */
  return (
    <div
      className="LOGIN__PAGE"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "80vh",
        width: "100%",
      }}
    >
      <h1 style={{ marginBottom: "5rem" }}>WELCOME</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "20rem",
          height: isLoginPage ? "17rem" : "22rem",
          border: "1px solid gray",
          padding: "6px 6px",
          borderRadius: ".5px",
        }}
      >
        <br />
        <h3>{isLoginPage ? "LOGIN" : "SIGN-UP"}</h3>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 5,
            height: "80%",
            width: "80%",
          }}
        >
          {!isLoginPage && (
            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="enter email..."
              onChange={handleChange}
              style={{ padding: "8px 12px" }}
            />
          )}

          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="enter username..."
            onChange={handleChange}
            style={{ padding: "8px 12px" }}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="enter password..."
            style={{ padding: "8px 12px" }}
          />

          {!isLoginPage && (
            <input
              type="password"
              name="passwordAgain"
              value={form.passwordAgain}
              onChange={handleChange}
              placeholder="enter password again..."
              style={{ padding: "8px 12px" }}
            />
          )}

          <div
            style={{
              display: "flex",
              gap: 6,
              width: "100%",
            }}
          >
            <button
              style={{ height: "1.5rem", width: "50%", cursor: "pointer" }}
              onClick={handleGuestUser}
            >
              GUEST
            </button>
            <button
              style={{ height: "1.5rem", width: "50%", cursor: "pointer" }}
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
          <p
            style={{
              textAlign: "center",
              color: "blue",
              marginBottom: ".5rem",
              cursor: "pointer",
            }}
            onClick={() => setIsLoginPage((prev) => !prev)}
          >
            {isLoginPage ? "Signup" : "login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
