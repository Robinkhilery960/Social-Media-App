import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu.js";

function Header() {
  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg bg-body-tertiary justify-content-between align-middle ">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="navbar-brand text-uppercase p-0 m-0 ">
              THE NETWORK
            </h1>
          </Link>

          <Search />

          <Menu />
        </div>
      </nav>
    </div>
  );
}

export default Header;
