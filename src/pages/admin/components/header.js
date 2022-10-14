import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  searchIcon,
  upDwnArr,
  Email,
  emailBlue,
  shareClock,
  shareClockBlue,
  Logout,
} from "../../../images";

const Header = () => {
  return (
    <>
      <header className="site-header">
        <div className="container-fluid">
          <nav className="navbar site-navigation">
            <div className="navbar-brand">
              <Link to={"/admin-panel"}>
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
                <Link to={"/admin-panel"} className="active">
                  <span className="txt">Home</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin-messages"}>
                  <span className="icon">
                    <img src={Email} alt="Message" className="iconBlack" />
                    <img src={emailBlue} alt="Message" className="iconBlue" />
                  </span>
                  <span className="txt">Message</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin-history"}>
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
                <Link>
                  <span className="icon">
                    <img src={Logout} alt="LogOut" />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
