import React, { useState, useEffect } from "react";
import { IconDownload } from "../../images";
import { db } from "../../FirbaseConfig/Firbase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "./components/header";
import { Stack, TablePagination } from "@mui/material";
import { jsPDF } from "jspdf";
const localUser = localStorage.getItem("valleyobsmsuser");
const UserHistory = () => {
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);
  useEffect(() => {
    var d = new Date();
    d.setDate(d.getDate() - Number(JSON.parse(localUser)?.history));

    const historyCollectionRef = collection(db, "history");
    const q = query(
      historyCollectionRef,
      where("createdAt", ">=", d),
      orderBy("createdAt", "desc")
    );
    const getHistory = async () => {
      try {
        setLoading(true);
        const data = await getDocs(q);
        setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);

  // Pagination fucntions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadPdf = (hist) => {
    // Landscape export, 2×4 inches
    const doc = new jsPDF({
      unit: "in",
    });

    doc.text(
      `Date:   ${moment(new Date(hist.createdAt.seconds * 1000)).format(
        "DD-MM-YYYY"
      )}`,
      1,
      1
    );
    doc.text(`Email: ${hist.receiverEmail}`, 1, 2);
    doc.text(`Phone: ${hist.receiverPhoneNumber}`, 1, 3);
    doc.text(`Message: ${hist.message}`, 1, 4);

    doc.save(
      `${moment(new Date(hist.createdAt.seconds * 1000)).format(
        "DD-MM-YYYY"
      )}-message.pdf`
    );
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
                      <th
                        className="text-center position-relative"
                        style={{ minWidth: "180px" }}
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <CircularProgress size="1rem" />
                    ) : (
                      history
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((hist, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(
                                new Date(hist.createdAt.seconds * 1000)
                              ).format("DD-MM-YYYY")}
                            </td>
                            <td>
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                {hist.receiverEmail}
                              </a>
                            </td>
                            <td>{hist.receiverPhoneNumber}</td>
                            <td>{hist.message}</td>
                            <td className="text-center">
                              <a className="tb-btn-smpl download">
                                <span
                                  className="icon"
                                  onClick={() => downloadPdf(hist)}
                                >
                                  <img src={IconDownload} alt="Download" />
                                </span>
                              </a>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
                <Stack spacing={2}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={history.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
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

export default UserHistory;
