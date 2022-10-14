import React, { useState, useEffect } from "react";
import { IconDownload } from "../../images";
import { db } from "../../FirbaseConfig/Firbase-config";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";

import Header from "./components/header";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const historyCollectionRef = collection(db, "history");
  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await getDocs(historyCollectionRef);
        setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  });

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
                    {history.map((hist, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{moment(hist.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            {hist.receiverEmail}
                          </a>
                        </td>
                        <td>{hist.receiverPhoneNumber}</td>
                        <td>{hist.message}</td>
                        <td className="text-center">
                          <button className="tb-btn-smpl download">
                            <span className="icon">
                              <img src={IconDownload} alt="Download" />
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

export default UserHistory;
