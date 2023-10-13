import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="navbox">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        {/* <a href="/">Home</a> */}
      </div>
    </div>
  );
}

export default Nav;
