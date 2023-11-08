import React from "react";

const HospitalPrimaryinfo = ({
  establishmentDetails,
  handlePrimaryInfoChange,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Hospital Name</label>
          <input
            type="text"
            className="form-control"
            name="hospitalName"
            value={establishmentDetails.hospitalName}
            onChange={handlePrimaryInfoChange}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Owner Name</label>
          <input
            type="text"
            className="form-control"
            name="ownerName"
            value={establishmentDetails.ownerName}
            onChange={handlePrimaryInfoChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalPrimaryinfo;
