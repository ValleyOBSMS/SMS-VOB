import { Logo } from "../../images";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirbaseConfig/Firbase-config";
import { getDoc, doc } from "firebase/firestore";

const AdminLogin = () => {
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
          const docRef = doc(db, "users", res.user.uid);
          const docSnap = await getDoc(docRef);
          const docRefSetting = doc(db, "settings", "dpLdWVS86Mn4XLr3IQkq");
          const docSetting = await getDoc(docRefSetting);
          localStorage.setItem(
            "valleyobsmsuser",
            JSON.stringify({
              ...docSnap.data(),
              settingId: docSetting.data().id,
              ...docSetting.data(),

              userId: docSnap.data().id,
            })
          );
          if (docSnap.data().role === "admin") {
            navigate("/admin-panel");
            window.location.reload();
          }
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
                      placeholder="Email"
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

                  <div className="text-end my-4">
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      Forgot Password
                    </a>
                  </div>

                  <div className="submit mt-4">
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

export default AdminLogin;
