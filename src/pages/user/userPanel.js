import React, { useState, useEffect } from "react";
import Header from "./components/header";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import axios from "axios";
import { Swal } from "sweetalert2";

const UserPanel = () => {
  const [values, setValues] = useState({
    email: "",
    number: "",
    customMessage: "",
    selectMessage: "",
  });
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");

  const createMessage = () => {
    let validation = true;
    if (!values.email.includes("@")) {
      setEmailError("Email must be in valid format");
      validation = false;
    }
    if (values.number === "") {
      setNumberError("Number is required");
      validation = false;
    }
    return validation;
  };
  const submit = () => {
    setEmailError("");
    setNumberError("");
    if (createMessage()) {
      try {
        axios
          .post(
            "https://corsproxyapi.herokuapp.com/https://us-central1-sms-vob.cloudfunctions.net/sendMessage",
            {
              receiverEmail: values.email,
              receiverPhoneNumber: values.number,
              message: values.customMessage,
              userId: "",
              bbcEmail: "",
            }
          )
          .then((res) => {
            console.log(res);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Message has been sent successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Fetch messages
  const [messages, setMessage] = useState([]);
  const usersCollectionRef = collection(db, "messages");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  });
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css"
        rel="stylesheet"
      />

      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-sms-form-sec">
            <div className="container-fluid">
              <div className="user-sms-form-wrapp">
                <div className="mdl-input-bx">
                  <label>Select Message</label>
                  <div className="select-input-bx select-input-message-wrapp">
                    <select
                      name="selectMessage"
                      className="form-control"
                      id="select-input-message"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          selectMessage: event.target.value,
                        }));
                      }}
                    >
                      <option value="">Select a Message...</option>
                      {messages.map((msg, index) => (
                        <option value={msg.message} key={index}>
                          {msg.message}
                        </option>
                      ))}
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="mdl-input-bx custom-message-wrapp">
                  <label>Custom Message</label>
                  <input
                    type="text"
                    name=""
                    id="custom-message"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Enter Custom Message"
                    onChange={(event) => {
                      setValues((prev) => ({
                        ...prev,
                        customMessage: event.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mdl-input-bx">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Copy & paste only"
                        onChange={(event) => {
                          setValues((prev) => ({
                            ...prev,
                            email: event.target.value,
                          }));
                        }}
                      />
                      <p className="text-danger">{emailError}</p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mdl-input-bx">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        name="number"
                        id="number"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Copy & paste only"
                        onChange={(event) => {
                          setValues((prev) => ({
                            ...prev,
                            number: event.target.value,
                          }));
                        }}
                      />
                      <p className="text-danger">{numberError}</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="custom-btn text-uppercase"
                  style={{ minWidth: "180px" }}
                  onClick={() => submit()}
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default UserPanel;
