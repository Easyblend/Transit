import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BecomeRider = () => {
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const worklocation = useRef(null);
  const vehicle = useRef(null);
  const age = useRef(null);
  const idCard = useRef(null);
  const carNumber = useRef(null);
  const cardescription = useRef(null);

  const [formState, setFormState] = useState(1);

  const submitRegister = (e) => {
    e.preventDefault();
    if (formState >= 3) {
      //submitForm
    } else {
      setFormState(formState + 1);
    }
  };

  return (
    <div>
      <nav className="navbar px-5">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          Transit
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item nav-link">
            <Link to="/" className=" nav-link">
              Go Home
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className="row justify-content-center align-items-center mt-5 pt-5">
          <div className="text-center">
            {" "}
            <h1 className="display-1">
              Become a <span className="text-primary fw-bold">Rider</span>
            </h1>
            <p className="text-muted">Take trips around you, Earn some cash</p>
          </div>
        </div>
        <div className="row justify-content-center text-center mx-auto ">
          <Form
            className="  mt-5 d-flex flex-column gap-4 col-10 col-sm-6 "
            onSubmit={submitRegister}
          >
            <div>
              {formState == 2 ? (
                <h2>About your vehicle!</h2>
              ) : formState == 3 ? (
                <h2 className="text-success">You're almost done!</h2>
              ) : (
                <h2>Join the Ride!</h2>
              )}
              <p className="text-muted">
                Create an Account be part of the Ride
              </p>
            </div>
            {formState == 1 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Full name.."
                    ref={name}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="tel"
                    placeholder="Phone +233"
                    ref={phone}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email.."
                    ref={email}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="eg Accra:"
                    ref={worklocation}
                    className="py-3"
                  />
                  <a className="mt-3 d-flex text-muted text-decoration-none">
                    Need more information? contact us
                  </a>
                </Form.Group>
              </>
            ) : formState == 2 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="vehicle type"
                    ref={vehicle}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Phone +233"
                    ref={age}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Ghana card umber"
                    ref={idCard}
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="car number"
                    ref={carNumber}
                    className="py-3"
                  />
                  <a className="mt-3 d-flex text-muted text-decoration-none">
                    Need more information? contact us
                  </a>
                </Form.Group>
              </>
            ) : formState == 3 ? (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Vehicle description"
                    ref={cardescription}
                    className="py-3"
                  />
                </Form.Group>
              </>
            ) : (
              <h1 className="text-success">Success</h1>
            )}

            {formState == 3 ? (
              <Button type="submit" className=" py-3 ">
                Become a Rider
              </Button>
            ) : (
              <Button type="submit" className=" py-3">
                Proceed
              </Button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BecomeRider;
