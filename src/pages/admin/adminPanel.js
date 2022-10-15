import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import axios from "axios";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import Header from "./components/header";
import Swal from "sweetalert2";
import { Stack, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const AdminPanel = () => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    message: "",
    backupEmail: "",
    createdAt: Date(),
    history: "0 Days",
    role: "",
    ipAddress: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [messageError, setMessageError] = useState("");

  // Function To Add Message
  const createMessage = async () => {
    setLoading(true);
    const msgsCollectionRef = collection(db, "messages");
    await addDoc(msgsCollectionRef, {
      message: values.message,
      createdAt: new Date(),
    })
      .then(async () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New User has been added",
          showConfirmButton: false,
          timer: 1200,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const handleMessage = (e) => {
    e.preventDefault();
    let validation = true;
    if (!values.message) {
      setMessageError("Message is required");
      validation = false;
      return validation;
    }
    setMessageError("");
    createMessage();
  };
  // Function to validate user
  const validUser = () => {
    let validation = true;
    if (!values.email.includes("@")) {
      setEmailError("Email must be valid format");
      validation = false;
    }
    if (values.password.length > 8 || values.password.length < 8) {
      setPasswordError("Password must be contains 8 characters");
      validation = false;
    }
    return validation;
  };

  const handleUser = async (e) => {
    setLoading(true);
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (validUser()) {
      await axios
        .post(
          "https://corsproxyapi.herokuapp.com/https://us-central1-sms-vob.cloudfunctions.net/addUser",
          {
            email: values.email,
            password: values.password,
            history: values.history,
            ipAddress: values.ipAddress,
          }
        )
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "New User has been added",
            showConfirmButton: false,
            timer: 1200,
          });
        })
        .catch((err) => {
          setEmailError(err.message);
        });
      setLoading(false);
    }
  };
  // Function to Display user

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const getUsers = async () => {
      setLoading(true);
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getUsers();
  }, []);

  // Function to Delete user

  const deleteUser = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ",
        cancelButton: "btn btn-danger order-1 left-gap",
        marginRight: "2px",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.post(
            "https://corsproxyapi.herokuapp.com/https://us-central1-sms-vob.cloudfunctions.net/deleteUser",
            {
              id: id,
            }
          );
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "User has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "User is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <>
      <section id="wrapper">
        <Header />

        <main className="site-main">
          <section className="user-backup-sec">
            <div className="container-fluid">
              <div className="user-backup-table-wrapp user-admin-table-wrapp">
                <div className="user-popup-btns">
                  <button
                    className="custom-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#addNewUserModal"
                  >
                    Add New User
                  </button>
                  <button
                    className="custom-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#messageModal"
                  >
                    Add New Message
                  </button>
                  <button
                    className="custom-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#backupModal"
                  >
                    Backup
                  </button>
                  <button className="custom-btn">Disable Email</button>
                </div>

                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Passwords</th>
                      <th style={{ minWidth: "200px" }}>History</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                          <td>{user.history}</td>
                          <td className="text-center">
                            <button className="tb-btn-smpl delete text-center">
                              <span className="icon">
                                <img
                                  src={IconFeatherTrash}
                                  alt="Trash"
                                  onClick={() => {
                                    deleteUser(user.id);
                                  }}
                                />
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <Stack spacing={2}>
                  <Pagination count={5} color="primary" />
                </Stack>
              </div>
            </div>
          </section>
        </main>
      </section>

      {/* AddNewUserModal */}
      <div
        className="modal fade custom-modal"
        id="addNewUserModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close ml-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Add New User</h3>
              <section className="custom-form-sec">
                <form className="icon-form" onSubmit={handleUser}>
                  <div className="mdl-input-bx">
                    <label>Email</label>
                    <input
                      type="text"
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

                  <div className="mdl-input-bx">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Enter Password"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }));
                      }}
                    />
                    <p className="text-danger">{passwordError}</p>
                  </div>

                  <div className="mdl-input-bx">
                    <label>History</label>
                    <select
                      name="history"
                      className="form-control"
                      id="history"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          history: event.target.value,
                        }));
                      }}
                    >
                      <option value="0 Days">0 Days</option>
                      <option value="7 Days">7 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="90 Days">90 Days</option>
                      <option value="180 Days">180 Days</option>
                      <option value="365 Days">365 Days</option>
                    </select>
                  </div>

                  <div className="mdl-input-bx">
                    <label>IP Address (Optional)</label>
                    <input
                      type="text"
                      name="ipAddress"
                      id="ipAddress"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Enter IP Address"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          ipAdress: event.target.value,
                        }));
                      }}
                    />
                  </div>

                  <button type="submit" className="custom-btn popSubmit">
                    {" "}
                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      "Add User"
                    )}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Modal backup */}
      <div
        className="modal fade custom-modal"
        id="backupModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close ml-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Backup</h3>
              <section className="custom-form-sec">
                <form className="icon-form">
                  <div className="mdl-input-bx">
                    <label>Enter Backup Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Enter Backup Email"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          backupEmail: event.target.value,
                        }));
                      }}
                    />
                    {/* <p className="text-danger">{backupEmailError}</p> */}
                  </div>

                  <button type="submit" className="custom-btn popSubmit">
                    Backup
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Modal message */}
      <div
        className="modal fade custom-modal"
        id="messageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close ml-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h3 className="modal-title text-center">Add New Message</h3>
              <section className="custom-form-sec">
                <form className="icon-form" onSubmit={handleMessage}>
                  <div className="mdl-input-bx">
                    <label>New Message</label>
                    <textarea
                      placeholder="Enter New Message"
                      className="form-control"
                      onChange={(event) => {
                        setValues((prev) => ({
                          ...prev,
                          message: event.target.value,
                        }));
                      }}
                    ></textarea>
                    <p className="text-danger">{messageError}</p>
                  </div>

                  <button
                    type="submit"
                    className="custom-btn popSubmit"
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      "Add Message"
                    )}
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
