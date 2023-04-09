import React, { useEffect, useState } from "react";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState("disabled");
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    if (token !== null) {
      navigate("/todo");
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@") && password.length >= 8) {
      setEmail("");
      setPassword("");
      signUp();
    }
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setBtnDisable("");
    } else setBtnDisable("disabled");
  }, [email, password]);

  const signUp = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.status === 201) {
        navigate("/signin");
      }
    });
  };

  return (
    <div className="signUpContainer">
      <div className="signUpWrap">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
            data-testid="email-input"
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
            data-testid="password-input"
          ></input>
          <button data-testid="signup-button" disabled={btnDisable}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
