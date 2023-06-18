import React from "react";
import { db } from "../Config/DatabaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Table = ({ riders, drivers, setRiders, setDrivers }) => {
  //Getting the list of Registered Drivers//

  const fetchBookedRide = async () => {
    try {
      setRiders(null);
      const querySnapshot = await getDocs(
        query(collection(db, "Booked Rides"), orderBy("time", "desc"))
      );
      let newRiders = querySnapshot.docs.map((doc) => doc.data());
      newRiders.length >= 5
        ? (newRiders = newRiders.splice(0, 5))
        : (newRiders = newRiders);
      setRiders(newRiders);

      try {
        const querySnapshot = await getDocs(collection(db, "Driver"));
        const newDrivers = querySnapshot.docs.map((doc) => doc.data());
        setDrivers(newDrivers);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return riders ? (
    <div class="table-responsive">
      <table class="table table-striped table-hover caption-top table-responsive ">
        <caption>Today's Ordered Tickets</caption>
        <thead>
          <tr>
            <th scope="col">Ticket #</th>
            <th scope="col">Destination</th>
            <th scope="col">Phone(+233)</th>
            <th scope="col">Name </th>
            <th>
              {" "}
              <span
                className="text-start "
                onClick={fetchBookedRide}
                role="button"
              >
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {riders.map((rider) => {
            return (
              <tr key={Math.random()}>
                <th scope="row">{rider.ticket_Id}</th>
                <td>{rider.destination}</td>
                <td>{rider.phone}</td>
                <td>{rider.Name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="d-flex justify-content-center ">
      <div class="spinner-border text-primary " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Table;
