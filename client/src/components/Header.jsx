import React, { useState } from "react";
import { sideBarDataForRest } from "./data/utility";
import { FaUserAlt } from "react-icons/fa";

const Header = ({
  isLoggedIn,
  setIsLoggedIn = () => {},
  setSearchInput = () => {},
  handleSearchApi = () => {},
  handleClickSideBar = () => {},
  userId = "",
}) => {
  const [searchText, setSearchText] = useState("");

  // ============== EVENT-HANDLERS ==================

  // get user search input
  const handleSearchTextChange = ({ target }) => {
    setSearchText(target.value);
  };

  const handlePage = () => {
    handleClickSideBar(sideBarDataForRest, "UserPage");
  };

  // search on keydown enter
  const handleSearhOnKeyDown = (e) => {
    if (e.key === "Enter") {
      //setSearchInput(searchText);
      handleSearchApi(searchText);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.sessionStorage.clear();
  }

  /**
   * JSX
   */
  return (
    <div className="HEADER__MAIN">
      <div style={{ width: "10rem" }}></div>
      <div>
        <h1>Fake Stack Overflow</h1>
      </div>
      {/* search bar  */}
      <div
        style={{
          display: isLoggedIn ? "flex" : "none",
          gap: ".8rem",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          id="searchBar"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleSearhOnKeyDown}
        />
        <button
          onClick={handleLogout}
          style={{ padding: "0px 6px", cursor: "pointer" }}
        >
          Logout
        </button>
        <button
          onClick={handlePage}
          style={{
            padding: "0px 12px",
            cursor: "pointer",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "lightcoral",
            display: userId !== "" ? "" : "none",
          }}
        >
          <FaUserAlt />
        </button>
      </div>
      <div
        style={{ width: "10rem", display: !isLoggedIn ? "block" : "none" }}
      ></div>
    </div>
  );
};

export default Header;
