import React from "react";
import Blob from "../Assets/Blob.png";

const HomePage = () => {
  return (
    <div className="container">
      <nav className="navbar bg-body-tertiary align-items-center">
        <div className="container">
          <a className="navbar-brand">Transit</a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-dark">Home</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="row align-items-center justify-content-center">
        <div className="col-md-6">
          <p className="display-2 pt-5 mt-5">
            Affordable Ride From Anywhere at Anytime.
          </p>
          <div className="d-flex gap-3 mt-4 pt-5">
            <button className="btn btn-primary border border-transparent px-md-5 py-md-3 rounded-3">
              Book a Ride
            </button>
            <button className="btn btn-light border border-1 border-secondary px-md-5 py-md-3 rounded-3">
              Become a Rider
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <img src={Blob} alt="" width="100%" className="image-fluid " />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
