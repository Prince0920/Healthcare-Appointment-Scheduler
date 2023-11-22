import React from "react";

const AdminPrimaryinfo = ({ primaryInfo, handleProfileInfoChange }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={primaryInfo.fullname}
            onChange={handleProfileInfoChange}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={primaryInfo.email}
            onChange={handleProfileInfoChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPrimaryinfo;
