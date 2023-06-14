import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Confitg/DatabaseConfig";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

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

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        name.current.value = user.displayName;
        email.current.value = user.email;
      } else {
        return navigate("/login");
      }
    });
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();

    if (formState >= 3) {
      const toastId = toast.loading("Signing you up...");
      console.log(formState);
      //submitForm
      addDoc(collection(db, "Drivers"), {
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        worklocation: worklocation.current.value,
        vehicle: vehicle.current.value,
        carNumber: carNumber.current.value,
        cardescription: cardescription.current.value,
        idCard: idCard.current.value,
      })
        .then(() => {
          toast.update(toastId, {
            render: "Application successfully sent!",
            type: "success",
            isLoading: false,
            autoClose: true,
          });
          setFormState(0);
        })
        .catch((error) =>
          toast.update(toastId, {
            render: error.code,
            type: "error",
            isLoading: false,
            autoClose: true,
          })
        );
    } else {
      console.log(formState);
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
                <h2 className="text-dark">You're almost done!</h2>
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
                    required
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="tel"
                    placeholder="Phone +233"
                    ref={phone}
                    required
                    className="py-3"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Email.."
                    ref={email}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="eg Accra:"
                    ref={worklocation}
                    className="py-3"
                    required
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
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Phone +233"
                    ref={age}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Ghana card umber"
                    ref={idCard}
                    className="py-3"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="car number"
                    ref={carNumber}
                    className="py-3"
                    required
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
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2020/04/10/13/28/success-5025797_1280.png"
                alt=""
                width="200px"
                className="mx-auto"
              />
            )}

            {formState == 3 ? (
              <Button type="submit" className=" py-3">
                Become a Rider
              </Button>
            ) : formState < 3 && formState !== 0 ? (
              <Button type="submit" className=" py-3">
                Proceed
              </Button>
            ) : (
              <>
                <h1 className="text-success py-0 my-0">
                  Application successful
                </h1>
                <p className="py-0 my-0">We will get back to you shrotly</p>
                <Link to="/" className="w-50 mx-auto py-2 mb-2 btn btn-primary">
                  Back to Home
                </Link>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BecomeRider;
