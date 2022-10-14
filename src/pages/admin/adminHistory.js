import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import moment from "moment";
import { Stack, Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { db } from "../../FirbaseConfig/Firbase-config";
import Header from "./components/header";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const AdminHistory = () => {
  const [history, setHistory] = useState([]);
  const historyCollectionRef = collection(db, "history");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(historyCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  });

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
        margin: "5px",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const userDoc = doc(db, "messages", id);
          await deleteDoc(userDoc);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
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
              <div
                className="user-backup-table-wrapp pt-5"
                style={{
                  marginLeft: "100px",
                }}
              >
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date & Time</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Message</th>
                      <th className="text-center position-relative">
                        <button
                          className="custom-btn popSubmit"
                          style={{
                            position: "absolute",
                            top: "-50px",
                            left: "-33px",
                            right: "0",
                            margin: "0 auto",
                            maxWidth: "230px",
                            padding: "10px 20px",
                            width: "136px",
                          }}
                        >
                          Clear History
                        </button>
                        <span>Delete</span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((hist, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{moment(hist.createdAt).format("DD-MM-YYYY")}</td>
                        <td>{hist.receiverEmail}</td>
                        <td>{hist.receiverPhoneNumber}</td>
                        <td>{hist.message}</td>
                        <td className="text-center">
                          <button className="tb-btn-smpl delete text-center">
                            <span className="icon">
                              <img
                                src={IconFeatherTrash}
                                alt="Trash"
                                onClick={() => {
                                  deleteUser(hist.id);
                                }}
                              />
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
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
    </>
  );
};

export default AdminHistory;
