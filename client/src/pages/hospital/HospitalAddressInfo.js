import React from "react";

const HospotalAddressInfo = ({ address, handleInputAddress }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Address Line One</label>
          <input
            type="text"
            className="form-control"
            name="addressLineOne"
            value={address.addressLineOne}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Village</label>
          <input
            type="text"
            className="form-control"
            name="village"
            value={address.village}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            className="form-control"
            name="district"
            value={address.district}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={address.state}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={address.pincode}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Telephone Number</label>
          <input
            type="text"
            className="form-control"
            name="telephoneNumber"
            value={address.telephoneNumber}
            onChange={handleInputAddress}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="mobileNumber"
            value={address.mobileNumber}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={address.email}
            onChange={handleInputAddress}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Website</label>
          <input
            type="text"
            className="form-control"
            name="website"
            value={address.website}
            onChange={handleInputAddress}
          />
        </div>
      </div>
    </div>
  );
};
export default HospotalAddressInfo;
