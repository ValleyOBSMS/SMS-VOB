import React, { useState, useEffect } from "react";
import { IconDownload } from "../../images";
import { db } from "../../FirbaseConfig/Firbase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Header from "./components/header";
import { Pagination, Stack, TablePagination } from "@mui/material";
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
      where("userId", "==", JSON.parse(localUser)?.userId),
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

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = React.useState(1);

  // Pagination fucntions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var lMargin = 15; //left margin in mm
  var rMargin = 15; //right margin in mm
  var pdfInMM = 210; // width of A4 in mm
  function getPDF(hist) {
    var doc = new jsPDF("p", "mm", "a4");

    const subject = doc.splitTextToSize(
      "Subject: Valley OBGYN",
      pdfInMM - lMargin - rMargin
    );

    const date = doc.splitTextToSize(
      `Date:   ${moment(new Date(hist.createdAt.seconds * 1000)).format(
        "MM-DD-YYYY hh:mm A"
      )}`,
      pdfInMM - lMargin - rMargin
    );

    const message = doc.splitTextToSize(
      hist.message,
      pdfInMM - lMargin - rMargin
    );

    const FROM = doc.splitTextToSize(
      "FROM: Valley OBGYN",
      pdfInMM - lMargin - rMargin
    );

    let TO = `${hist.receiverPhoneNumber.slice(
      1,
      hist.receiverPhoneNumber.length
    )}, ${hist.receiverEmail}`;
    if (!hist.receiverPhoneNumber) {
      TO = hist.receiverEmail;
    }
    if (!hist.receiverEmail) {
      TO = hist.receiverPhoneNumber.slice(1, hist.receiverPhoneNumber.length);
    }

    const ToText = doc.splitTextToSize(
      `To: ${TO}`,
      pdfInMM - lMargin - rMargin
    );
    const status = doc.splitTextToSize(
      "Status: Sent",
      pdfInMM - lMargin - rMargin
    );

    doc.text(lMargin, 20, subject);
    doc.text(lMargin, 27, date);
    doc.text(lMargin, 34, FROM);
    doc.text(lMargin, 41, ToText);
    doc.text(lMargin, 70, message);
    doc.text(lMargin, 110, status);
    doc.save(`${TO}.pdf`);
  }

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
                            <td>
                              <a href="/" onClick={(e) => e.preventDefault()}>
                                {hist.receiverEmail}
                              </a>
                            </td>
                            <td>{hist.receiverPhoneNumber}</td>
                            <td>{hist.message.slice(0, 30)}...</td>
                            <td className="text-center">
                              <a className="tb-btn-smpl download">
                                <span
                                  className="icon"
                                  onClick={() => getPDF(hist)}
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
                <br />
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

export default UserHistory;
