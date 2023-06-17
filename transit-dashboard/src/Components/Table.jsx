import React from "react";

const Table = ({ riders, drivers }) => {
  //Getting the list of Registered Drivers//

  return riders ? (
    <div class="table-responsive">
      <table class="table table-striped table-hover caption-top table-responsive ">
        <caption>Today's Ordered Tickets</caption>
        <thead>
          <tr>
            <th scope="col">Ticket #</th>
            <th scope="col">Destination</th>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {riders.map((rider) => {
            return (
              <tr>
                <th scope="row">{rider.ticket_Id}</th>
                <td>{rider.destination}</td>
                <td>unset</td>
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
