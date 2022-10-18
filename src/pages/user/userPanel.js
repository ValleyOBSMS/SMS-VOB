import React, { useState, useEffect } from "react";
import Header from "./components/header";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import axios from "axios";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
const localUser = localStorage.getItem("valleyobsmsuser");
const UserPanel = () => {
  const [values, setValues] = useState({
    email: "",
    number: "",
    customMessage: "",
    selectMessage: "",
  });
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [settings, setSettings] = useState(JSON.parse(localUser));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const docRefSetting = doc(db, "settings", "dpLdWVS86Mn4XLr3IQkq");
      const docSetting = await getDoc(docRefSetting);
      setSettings(docSetting.data());
    }
    fetchData();
  }, []);

  const createMessage = () => {
    let validation = true;
    if (!values.email.includes("@") || !values.email) {
      if (!values.number) {
        setEmailError("Email must be valid format");
        validation = false;
      }
    }
    if (!values.email && !values.number) {
      setNumberError("Phone number is required");
      validation = false;
    }
    return validation;
  };
  const submit = async () => {
    setEmailError("");
    setNumberError("");
    if (createMessage()) {
      let message = document.getElementById("select-input-message").value;
      if (!message && message !== "custom") {
        message = values.customMessage;
      }
      try {
        setLoading(true);
        const data = {
          receiverEmail: values.email,
          receiverPhoneNumber: values.number,
          message,
          userId: settings?.id,
          bbcEmail: settings?.backupEmail,
        };

        await axios.post(
          "https://corsproxyapi.herokuapp.com/https://us-central1-sms-vob.cloudfunctions.net/sendMessage",
          data
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Message has been sent successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  // Fetch messages
  const [messages, setMessage] = useState([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, "messages");
    const getMessages = async () => {
      const data = await getDocs(usersCollectionRef);
      setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMessages();
  }, []);

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
                        disabled={settings?.disableEmail ? true : false}
                        placeholder={
                          settings?.disableEmail
                            ? "Email option temporarily disabled"
                            : "Copy & paste only"
                        }
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

                {loading ? (
                  <CircularProgress size="1rem" />
                ) : (
                  <button
                    type="submit"
                    className="custom-btn text-uppercase"
                    style={{ minWidth: "180px" }}
                    onClick={() => submit()}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default UserPanel;
