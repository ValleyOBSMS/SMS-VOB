import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../images";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirbaseConfig/Firbase-config";
const UserLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = () => {
    let validation = true;
    if (!values.email.includes("@")) {
      setEmailError("Email must be valid form");
      validation = false;
    }
    if (values.password.length < 8 || values.password.length > 8) {
      setPasswordError("Password must be contain 8 characters");
      validation = false;
    }
 
    return validation;
  };
  const submit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    if (handleSubmit()) {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(async (res) => {
          navigate("/user-panel");
          console.log(res);
        })
        .catch((err) => {
          setEmailError(err.message);
        });
    }
  };
  return (
    <>
      <section id="wrapper">
        <section className="common-sec login-page-sec">
          <div className="container">
            <div className="logo-dv text-center">
              <a className="navbar-brand" href="/">
                <span className="site-logo">
                  <img src={Logo} alt="Logo" />
                </span>
              </a>
            </div>

            <div className="login-form-dv">
              <section className="custom-form-sec">
                <form className="icon-form" onSubmit={submit}>
                  <div className="input-bx">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Enter Email"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          email: event.target.value,
                        }));
                      }}
                    />
                    <p className="text-danger">{emailError}</p>
                  </div>

                  <div className="input-bx pass-bx">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Password"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }));
                      }}
                    />
                    <p className="text-danger">{passwordError}</p>
                  </div>

                  <div className="submit" style={{ marginTop: "34px" }}>
                    <button type="submit" className="custom-btn round-btn">
                      Login
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default UserLogin;
