import React, { useEffect } from "react";
import Table from "../Components/Table";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../Config/DatabaseConfig";

const OtherPages = ({ riders, setDrivers, setRiders, drivers }) => {
  const fetchBookedRide = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Booked Rides"), orderBy("time", "desc"))
      );
      let newRiders = querySnapshot.docs.map((doc) => doc.data());

      setRiders(newRiders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookedRide();
  });

  return (
    <div className="vh-100">
      <Table
        riders={riders}
        drivers={drivers}
        setDrivers={setDrivers}
        setRiders={setRiders}
      />
      <hr />
    </div>
  );
};

export default OtherPages;
