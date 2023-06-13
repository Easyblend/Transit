import React, { useEffect, useState } from "react";
import Blob from "../Assets/Blob.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Confitg/DatabaseConfig";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user.displayName);
      setPhoto(user.photoURL);
    });
  }, []);

  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    return navigate("/login");
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-body-transparent">
        <div className="container-fluid align-items-center">
          <Link to="/" className="navbar-brand ">
            TranSit
          </Link>
          <button
            className="navbar-toggler border-none border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {name}
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={photo}
                    alt="profile"
                    width="35px"
                    height="35px"
                    className="rounded-5 shadow-lg border border-2"
                  />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/bookride" className="dropdown-item">
                      Book a Ride
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item">
                      Become a Rider
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <h6 className="dropdown-item" onClick={logOut}>
                      Log Out
                    </h6>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row align-items-center justify-content-center">
        <div className="col-md-5">
          <p className="display-2 pt-5 mt-5">
            Affordable Ride From Anywhere at Anytime.
          </p>
          <div className="d-flex gap-3 mt-4 pt-5">
            <Link
              to="/bookride"
              className="btn btn-primary px-md-5 py-md-3 rounded-3  shadow-sm"
            >
              Book a Ride
            </Link>
            <Link
              to="/becomerider"
              className="btn btn-light  px-md-5 py-md-3 rounded-3 shadow-sm border border-mute"
            >
              Become a Rider
            </Link>
          </div>
        </div>
        <div className="col-md-7">
          <img src={Blob} alt="" width="100%" className="image-fluid " />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
