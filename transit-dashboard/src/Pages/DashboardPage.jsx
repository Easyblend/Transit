import React from "react";
import Table from "../Components/Table";
import Map from "../Components/Map";

const DashboardPage = ({ riders, drivers }) => {
  return (
    <div className="container">
      <div className="row  px-0 g-0 mt-4">
        <Map riders={riders} />
      </div>
      <div className="row mt-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rides to be Completed</h5>
              <p class="card-text">
                <span className="h1 text-primary">{riders?.length}</span>
                {riders?.length > 1 ? " Customers are" : " Customer is"} waiting
                for a ride
              </p>
              <a class="btn btn-primary">View Rider</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Number of Drivers</h5>
              <p class="card-text">
                <span className="h1 text-primary">{drivers?.length}</span>{" "}
                Drivers are currently available
              </p>
              <a class="btn btn-primary">View drivers</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 table">
        <Table riders={riders} drivers={drivers} />
      </div>
    </div>
  );
};

export default DashboardPage;
