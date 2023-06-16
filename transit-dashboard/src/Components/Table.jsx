import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/DatabaseConfig";

const Table = () => {
  //Getting the list of Registered Drivers//
  const [drivers, setDrivers] = useState([]);
  const fetchDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Driver"));

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setDrivers({ ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <table class="table table-striped-columns">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry the Bird</td>
          <td>Junoio Peter</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
