import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import Header from "./components/header";
import moment from "moment";
import Swal from "sweetalert2";
import Paginations from "./Pagination/Pagination";
const AdminMessage = () => {
  const [message, setMessage] = useState([]);
  const usersCollectionRef = collection(db, "messages");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  // Pagination
  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
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
                    {message
                      .slice(pagination.start, pagination.end)
                      .map((msg, index) => (
                        <tr key={index}>
                          <td>{moment(msg.createdAt).format("DD-MM-YYYY")}</td>
                          <td>{msg.message}</td>
                          <td className="text-center">
                            <button className="tb-btn-smpl delete text-center">
                              <span className="icon">
                                <img
                                  src={IconFeatherTrash}
                                  alt="Trash"
                                  onClick={() => {
                                    deleteUser(msg.id);
                                  }}
                                />
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Paginations
                  showPerPage={showPerPage}
                  onPaginationChange={onPaginationChange}
                  total={message.length}
                />
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default AdminMessage;
