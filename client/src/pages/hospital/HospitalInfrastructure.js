import React from "react";
const HospitalInfrastructure = ({
  infrastructureDetails,
  handelInfrastructure,
}) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Total Area</label>
          <input
            type="text"
            className="form-control"
            name="totalArea"
            value={infrastructureDetails.totalArea}
            onChange={handelInfrastructure}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Constructed Area</label>
          <input
            type="text"
            className="form-control"
            name="constructedArea"
            value={infrastructureDetails.constructedArea}
            onChange={handelInfrastructure}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalInfrastructure;
