import React, { useState, useEffect } from "react";
import { IconFeatherTrash } from "../../images";
import moment from "moment";
import { Stack, Pagination, TablePagination } from "@mui/material";
import Swal from "sweetalert2";
import Header from "./components/header";
import { db } from "../../FirbaseConfig/Firbase-config";
import { collection, getDocs, deleteDoc, doc, query } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const AdminHistory = () => {
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  useEffect(() => {
    const historyCollectionRef = collection(db, "history");
    const getHistory = async () => {
      setLoading(true);
      const data = await getDocs(historyCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    getHistory();
  }, []);

  const deleteHistory = async (id) => {
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
          const userDoc = doc(db, "history", id);
          await deleteDoc(userDoc);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "History has been deleted.",
            "success"
          );
          window.location.reload();
        }
      });
  };

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(1);

  // Pagination fucntions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [clearLoading, setClearLoadig] = useState(false);

  const clearHistory = async () => {
    try {
      setClearLoadig(true);
      const q = query(collection(db, "history"));
      const querySnapshot = await getDocs(q);

      const q2 = query(collection(db, "mail"));
      const querySnapshot2 = await getDocs(q2);

      const deleteOps = [];
      const deleteOps2 = [];

      querySnapshot.forEach((doc) => {
        deleteOps.push(deleteDoc(doc.ref));
      });
      querySnapshot2.forEach((doc) => {
        deleteOps2.push(deleteDoc(doc.ref));
      });

      await Promise.all(deleteOps);
      await Promise.all(deleteOps2);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "History deleted successfully",
        showConfirmButton: false,
        timer: 1200,
      });
      setClearLoadig(false);
      window.location.reload();
    } catch (error) {
      setClearLoadig(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1200,
      });
    }
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
                        {clearLoading ? (
                          <CircularProgress size="1rem" />
                        ) : (
                          <button
                            onClick={() => clearHistory()}
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
                        )}

                        <span>Delete</span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <CircularProgress size="1rem" />
                    ) : (
                      history
                        .slice(
                          (page - 1) * rowsPerPage,
                          (page - 1) * rowsPerPage + rowsPerPage
                        )
                        .map((hist, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(
                                new Date(hist.createdAt.seconds * 1000)
                              ).format("DD-MM-YYYY")}
                            </td>
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
                                      deleteHistory(hist.id);
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
                      history.length < rowsPerPage
                        ? 1
                        : Math.ceil(history.length / rowsPerPage)
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

export default AdminHistory;
