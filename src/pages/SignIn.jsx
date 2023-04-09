import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
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
      signIn();
    }
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setBtnDisable("");
    } else setBtnDisable("disabled");
  }, [email, password]);

  const signIn = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.access_token !== undefined) {
          window.localStorage.setItem("access_token", res.access_token);
          navigate("/todo");
        }
      });
  };

  return (
    <div className="signInContainer">
      <div className="signInWrap">
        <h1>로그인</h1>
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
          <button data-testid="signin-button" disabled={btnDisable}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
