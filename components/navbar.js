import React from "react";
import fire from "../config/firebaseConfig";
import { useEffect, useState } from "react";
export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = fire.auth().currentUser;
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  const handleLogout = () => {
    fire.auth().signOut();
  };
  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand">WeBlog</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" href="/users/register">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/users/login">
                      Login
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span onClick={handleLogout} className="nav-link active">
                    Logout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
