import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/DashboardPage";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./Config/DatabaseConfig";
import RideRequest from "./Pages/RideRequest";
import DriversPage from "./Pages/DriversPage";
import AdminPortal from "./Pages/AdminPortal";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [riders, setRiders] = useState(null);

  const fetchDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Driver"));
      const newDrivers = querySnapshot.docs.map((doc) => doc.data());
      setDrivers(newDrivers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookedRide = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Booked Rides"), orderBy("time", "desc"))
      );
      let newRiders = querySnapshot.docs.map((doc) => doc.data());
      newRiders.length >= 5
        ? (newRiders = newRiders.splice(0, 5))
        : (newRiders = newRiders);
      setRiders(newRiders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchBookedRide();
  }, []);

  const [admin, setAdmin] = useState(null);

  return (
    <div className="container-fluid mx-0 g-0 p-0">
      <div className="row mx-0 g-0 p-0">
        <div className="col-2 col-sm-3 col-md-2">
          <Sidebar />
        </div>
        <div className="col-10 col-sm-7  col-md-9 mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  riders={riders}
                  drivers={drivers}
                  setDrivers={setDrivers}
                  setRiders={setRiders}
                />
              }
            />
            <Route
              path="/ride-request"
              element={
                <RideRequest
                  riders={riders}
                  drivers={drivers}
                  setDrivers={setDrivers}
                  setRiders={setRiders}
                />
              }
            />
            <Route
              path="/drivers"
              element={
                <DriversPage
                  riders={riders}
                  drivers={drivers}
                  setDrivers={setDrivers}
                  setRiders={setRiders}
                />
              }
            />
            <Route
              path="/admin-login"
              element={
                <AdminPortal
                  riders={riders}
                  drivers={drivers}
                  setDrivers={setDrivers}
                  setRiders={setRiders}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
