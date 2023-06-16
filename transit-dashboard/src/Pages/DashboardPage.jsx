import React from "react";
import Table from "../Components/Table";

const DashboardPage = () => {
  return (
    <div className="container">
      <div className="row  px-0 g-0 mt-4">
        <div
          className="col "
          style={{
            backgroundImage: `url(
                https://images.pexels.com/photos/14534763/pexels-photo-14534763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1            )`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",

            height: "20rem",
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "rgba(0,0,0,0.4)",
            backgroundBlendMode: "darken",
            boxShadow: "0px 0px 6px 5px rgba(0,0,0,0.2)",
          }}
        >
          <div className="row pt-4 px-5 text-light">
            <h4 className="col-6">Dashboard</h4>
            <div className="col-6 text-end">Profile</div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rides to be Completed</h5>
              <p class="card-text">
                <span className="h1 text-primary">56</span> Rides are waiting to
                be completed
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
                <span className="h1 text-primary">12</span> Drivers are
                currently available
              </p>
              <a class="btn btn-primary">View drivers</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 table">
        {" "}
        <Table />
      </div>
    </div>
  );
};

export default DashboardPage;
