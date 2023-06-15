import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 ">
      <Container className="text-center">
        <div className="row my-auto align-items-center">
          <div className="col">
            <p className="my-0 py-0">Contact information</p>
            <div>
              +233 597 467 141 <br />
              +233 597 467 141
            </div>
          </div>
          <div className="col">
            {" "}
            <p className="mb-0">
              &copy; 2023 Elrom Transport Services. All rights reserved.
            </p>
            <p className="mb-0">123 Main Street, Greater Accra, Ghana</p>
          </div>
          <div className="col">
            <p className="my-0 py-0">Sites</p>
            <div>
              <a href="https://elorm-media.netlify.app">
                Elorm's Media and Business Center
              </a>{" "}
              <br />
              <a href="https://elorm-transit.netlify.app">
                Elorm's Transport Services
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
