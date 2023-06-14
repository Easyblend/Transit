import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

const BookRidePage = () => {
  const [location, setLocation] = useState("unknown");

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

    const apiKey = process.env.REACT_APP_GEOLOCAT_API;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=2&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Location:", data[0].name);
        setLocation(data[0].name);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="main-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div className="zindex-5 bg-dark text-light opacity-100 px-5 py-4 mb-3 rounded-4">
        <Form className=" mx-auto d-flex flex-column gap-3">
          <div>
            <h3>Book a Ride!</h3>
            <p className="text-light">Select your closest pickup point</p>
          </div>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="your location"
              required
              className="py-2"
              value={location || ""}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="To"
              required
              className="py-2"
            />
            <br />
            <select className="form-select" aria-label="Default select example">
              <option selected>Choose Pickup Point</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </Form.Group>
          <Button type="submit" className="mt-3">
            Book a seat GHC 390
          </Button>
        </Form>
      </div>
    </>
  );
};

export default BookRidePage;
