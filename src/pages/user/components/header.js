import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  searchIcon,
  upDwnArr,
  shareClock,
  shareClockBlue,
  Logout,
} from "../../../images";

import { auth } from "../../../FirbaseConfig/Firbase-config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
const Header = () => {
  const navigate = useNavigate();
  const signOutAdmin = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("valleyobsmsuser");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <header className="site-header">
        <div className="container-fluid">
          <nav className="navbar site-navigation">
            <div className="navbar-brand">
              <Link to={"/user-panel"}>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div className="search-dv">
              <form action="" id="search_form">
                <button type="submit">
                  <img src={searchIcon} alt="Search" />
                </button>
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                />
              </form>
              <span className="ic-dv arrow-ic">
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <img src={upDwnArr} alt="Icon" />
                </a>
              </span>
            </div>

            <ul className="navbar-nav">
              <li>
                <Link to={"/user-panel"} className="active">
                  <span className="txt">Home</span>
                </Link>
              </li>
              <li>
                <Link to={"/user-history"}>
                  <span className="icon">
                    <img src={shareClock} alt="History" className="iconBlack" />
                    <img
                      src={shareClockBlue}
                      alt="History"
                      className="iconBlue"
                    />
                  </span>
                  <span className="txt">History</span>
                </Link>
              </li>
              <li>
                <span className="icon" style={{ cursor: "pointer" }}>
                  <img
                    src={Logout}
                    alt="LogOut"
                    onClick={() => signOutAdmin()}
                  />
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
