import React, { useEffect, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState("disabled");

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
      console.log("😀");
    }
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setBtnDisable("");
    } else setBtnDisable("disabled");
  }, [email, password]);

  return (
    <div>
      <form onClick={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <button disabled={btnDisable}>회원가입</button>
      </form>
    </div>
  );
}
