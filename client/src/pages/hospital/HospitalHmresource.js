import React from "react";

const HospitalHmresource = ({ humanRecource, handelHumanResChange }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Total Employees</label>
          <input
            type="text"
            className="form-control"
            name="totalEmployees"
            value={humanRecource.totalEmployees}
            onChange={handelHumanResChange}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Total Doctors</label>
          <input
            type="text"
            className="form-control"
            name="totalDoctors"
            value={humanRecource.totalDoctors}
            onChange={handelHumanResChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalHmresource;
