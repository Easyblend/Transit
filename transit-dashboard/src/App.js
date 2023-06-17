import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import DashboardPage from "./Pages/DashboardPage";
import OtherPages from "./Pages/OtherPages";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./Config/DatabaseConfig";

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
              element={<DashboardPage riders={riders} drivers={drivers} />}
            />
            <Route path="/other" element={<OtherPages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
