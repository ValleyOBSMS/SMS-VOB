import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import Header from "./components/header";
import moment from "moment";
import Swal from "sweetalert2";
const AdminMessage = () => {
  //  Function for list Messages

  const [message, setMessage] = useState([]);

  useEffect(() => {
    const msgCollectionRef = collection(db, "messages");
    const getMessages = async () => {
      const data = await getDocs(msgCollectionRef);
      setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMessages();
  }, []);

  //  Function for deltese messages
  const deleteMssage = async (id) => {
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
          const msgDoc = doc(db, "messages", id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your message has been deleted.",
            "success"
          );
          await deleteDoc(msgDoc);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your message is safe :)",
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
              <div className="user-backup-table-wrapp pt-5">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "130px" }}>Date</th>
                      <th>Message</th>
                      <th className="text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {message.map((msg, index) => (
                      <tr key={index}>
                        <td>{moment(msg.createdAt).format("LLLL")}</td>
                        <td>{msg.message}</td>
                        <td className="text-center">
                          <button className="tb-btn-smpl delete text-center">
                            <span className="icon">
                              <img
                                src={IconFeatherTrash}
                                alt="Trash"
                                onClick={() => {
                                  deleteMssage(msg.id);
                                }}
                              />
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default AdminMessage;
