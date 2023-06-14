import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { toast } from "react-toastify";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Confitg/DatabaseConfig";
import { useNavigate } from "react-router-dom";

const BookRidePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
        setPhoto(user.photoURL);
      } else {
        return navigate("/login");
      }
    });
  }, []);

  const [location, setLocation] = useState("Unknown");
  const [geolocation, setGeolocation] = useState(null);

  const [destination, setDestination] = useState(null);

  const [formState, setFormState] = useState(0);

  const destinationCities = [
    "Accra",
    "Techiman",
    "Kumasi",
    "Cape-Coast",
    "Takoradi",
  ];

  const takeOffTime = [
    "4:00am",
    "6:00am",
    "9:00am",
    "12:00pm",
    "3:00pm",
    "6:00pm",
  ];
  const [time, setTime] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function getWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setGeolocation({ lat: latitude, lon: longitude });
  }

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (geolocation !== null) {
      const apiKey = process.env.REACT_APP_GEOLOCAT_API;
      const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geolocation.lat}&lon=${geolocation.lon}&limit=1&appid=${apiKey}`;

      // fetch(apiUrl)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setLocation(data[0].state);
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     toast.warning("something went wrong");
      //   });
    }
  }, [geolocation]);

  const createRoutineMachineLayer = ({ destLat, destLon }) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(geolocation.lat, geolocation.lon),
        L.latLng(destLat, destLon),
      ],
      show: false,
      lineOptions: {
        styles: [
          {
            color: " blue",
            opacity: 0.8,
            weight: 4,
          },
        ],
      },
    });

    return instance;
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  //PDF fucntion////////////////////////////////////////////////

  const generateTicket = async () => {
    // Create a new PDF document

    // Create a new PDF document with custom page size
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 300; // Specify the width of the ticket
    const pageHeight = 150; // Specify the height of the ticket
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Set font and size
    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.setFont(font);

    // Set text position and color
    const x = 50;
    const y = page.getHeight() - 50;
    const color = rgb(0, 0, 0); // Black color
    page.drawText(
      `Ticket for ${name}
       Seat Number : 24

       ticket id : #4255-32372-12B
    `,
      { x, y, size: fontSize, color }
    );

    // Save the PDF as a Blob
    const pdfBytes = await pdfDoc.save();

    // Create a download link and trigger the download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ticket.pdf";
    link.click();
  };

  const rideRequest = (e) => {
    e.preventDefault();
    if (formState == 1) {
      setFormState(formState + 1);
    } else {
      //send data to database

      setFormState(0);
      toast.success("Ride successfully Booked!");
    }
  };

  return geolocation ? (
    <>
      <MapContainer
        center={[geolocation.lat, geolocation.lon]}
        zoom={15}
        scrollWheelZoom={false}
        className="main-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine
          destLat={
            destination == "Accra"
              ? 5.6037
              : destination == "Kumasi"
              ? 6.6885
              : destination == "Cape-Coast"
              ? 5.1104
              : destination == "Takoradi"
              ? 4.9126
              : destination == "Techiman"
              ? 7.5911
              : geolocation.lat
          }
          destLon={
            destination == "Accra"
              ? -0.187
              : destination == "Kumasi"
              ? -1.6244
              : destination == "Cape-Coast"
              ? -1.2464
              : destination == "Takoradi"
              ? -1.774
              : destination == "Techiman"
              ? -1.935
              : geolocation.lon
          }
        />
        <Marker position={[geolocation.lat, geolocation.lon]}>
          <Popup>
            <h3>You are here</h3>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="zindex-5 bg-dark text-light opacity-100 px-5 py-4 mb-3 rounded-4">
        <Form
          className=" mx-auto d-flex flex-column gap-3"
          onSubmit={rideRequest}
        >
          <div>
            {formState == 0 ? (
              <>
                <h3 className="text-primary text-center">
                  Ride successfully booked
                </h3>{" "}
                <p className="text-light">
                  Be at the {location} transit station at{" "}
                  <span className="text-warning">{time}</span>
                </p>
                <div>
                  <Button className="text-center" onClick={generateTicket}>
                    Generate Ticket
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3>Book a Ride!</h3>
                <p className="text-light">Select your Destination point</p>
              </>
            )}
          </div>
          {formState == 1 ? (
            <>
              <Form.Group className="my-0 py-0 g-0">
                <Form.Control
                  type="text"
                  placeholder="your location"
                  required
                  className="py-2"
                  value={location}
                />
              </Form.Group>

              {/* <Form.Control
              type="text"
              placeholder="To"
              required
              className="py-2"
            /> */}
              <h4 className="text-center my-0 py-0 g-0">To</h4>

              <Form.Group className="my-0 py-0 g-0">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Choose Route"
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option disabled>Choose Route</option>
                  {destinationCities.map((destination) => {
                    return destination !== location ? (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ) : null;
                  })}
                </select>
              </Form.Group>
              <Button type="submit" className="mt-3">
                Next
              </Button>
            </>
          ) : formState == 2 ? (
            <>
              <Form.Group className="my-0 py-0 g-0">
                <Form.Control
                  type="text"
                  placeholder="Bus type e.g VIP Transit"
                  required
                  className="py-2"
                />
              </Form.Group>

              <Form.Control
                type="number"
                placeholder="seat Number"
                required
                max={24}
                min={1}
                className="py-2"
              />
              <p className="text-center my-0 py-0">
                <span className="text-danger">24 </span>seats Available
              </p>

              <Form.Group className="my-0 py-0 g-0">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Expected take off time"
                  required
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option disabled>Expected take off time</option>
                  {takeOffTime.map((time) => {
                    return (
                      <option key={time} value={time}>
                        Today {time}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
              <Button type="submit" className="mt-3">
                Book a seat
              </Button>
            </>
          ) : (
            ""
          )}
        </Form>
      </div>
    </>
  ) : (
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default BookRidePage;
