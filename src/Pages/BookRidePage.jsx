import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const BookRidePage = () => {
  const [location, setLocation] = useState("Unknown");
  const [geolocation, setGeolocation] = useState(null);

  const [destination, setDestination] = useState(null);

  const destinationCities = [
    "Accra",
    "Techiman",
    "Kumasi",
    "Cape-Coast",
    "Takoradi",
  ];

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
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.lat}&lon=${geolocation.lon}&appid=${apiKey}`;

      // fetch(apiUrl)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Location:", data);
      //     setLocation(data.name);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }, [geolocation]);

  const createRoutineMachineLayer = ({ destLat, destLon }) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(33.50546582848033, 36.49547681726967),
        L.latLng(destLat, destLon),
      ],
      show: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 1,
            weight: 6,
          },
        ],
      },
    });

    return instance;
  };

  const RoutingMachine = createControlComponent(createRoutineMachineLayer);

  return geolocation ? (
    <>
      <MapContainer
        center={[geolocation.lat, geolocation.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="main-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RoutingMachine
          destLat={33.50546582848033}
          destLon={36.29547681726967}
        />
        <Marker position={[geolocation.lat, geolocation.lon]}>
          <Popup>
            <h3>You are here</h3>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="zindex-5 bg-dark text-light opacity-100 px-5 py-4 mb-3 rounded-4">
        <Form className=" mx-auto d-flex flex-column gap-3">
          <div>
            <h3>Book a Ride!</h3>
            <p className="text-light">Select your Destination point</p>
          </div>
          <Form.Group className="my-0 py-0 g-0">
            <Form.Control
              type="text"
              placeholder="your location"
              required
              disabled
              className="py-2"
              value={location || ""}
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
              className="form-select "
              aria-label="Default select example"
            >
              <option selected>Choose Route</option>
              {destinationCities.map((destination) => {
                return destination !== location ? (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ) : (
                  ""
                );
              })}
            </select>
          </Form.Group>
          <Button type="submit" className="mt-3">
            Book a seat GHC 390
          </Button>
        </Form>
      </div>
    </>
  ) : (
    <h1>Error</h1>
  );
};

export default BookRidePage;
