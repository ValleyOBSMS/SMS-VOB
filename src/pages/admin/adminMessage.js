import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../FirbaseConfig/Firbase-config";
import Header from "./components/header";
import moment from "moment";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Pagination, Stack, TablePagination } from "@mui/material";
const AdminMessage = () => {
  //  Function for list Messages

  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const msgCollectionRef = collection(db, "messages");
    const q = query(msgCollectionRef, orderBy("createdAt", "desc"));

    const getMessages = async () => {
      setLoading(true);
      const data = await getDocs(q);
      setMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
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
          await deleteDoc(msgDoc);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your message has been deleted.",
            "success"
          );
          window.location.reload();
        }
      });
  };

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = React.useState(1);

  // Pagination fucntions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                    {loading ? (
                      <CircularProgress size="1rem" />
                    ) : (
                      message
                        .slice(
                          (page - 1) * rowsPerPage,
                          (page - 1) * rowsPerPage + rowsPerPage
                        )
                        .map((msg, index) => (
                          <tr key={index}>
                            <td>
                              {moment(
                                new Date(msg.createdAt.seconds * 1000)
                              ).format("DD-MM-YYYY")}
                            </td>
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
                        ))
                    )}
                  </tbody>
                </table>
                <Stack
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Pagination
                    shape="rounded"
                    color="primary"
                    onChange={handleChangePage}
                    component="div"
                    count={
                      message.length < rowsPerPage
                        ? 1
                        : Math.ceil(message.length / rowsPerPage)
                    }
                    page={page}
                  />
                </Stack>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};

export default AdminMessage;
