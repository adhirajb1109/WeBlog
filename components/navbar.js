import React from "react";
import fire from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";
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
          <Link href="/">
            <a className="navbar-brand">WeBlog</a>
          </Link>
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
                <Link aria-current="page" href="/">
                  <a className="nav-link active">Home</a>
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link href="/users/register">
                      <a className="nav-link active">Register</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/users/login">
                      <a className="nav-link active">Login</a>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/blog/add">
                      <a className="nav-link active">Add Post</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={handleLogout}
                      href="#"
                      className="nav-link active"
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
