import React from "react";

const HospitalAbout = ({ about, handelHospitaAbout }) => {
  return (
    <div className="form-group">
      <label>About the Hospital</label>
      <textarea
        className="form-control"
        name="aboutHospital"
        value={about.aboutHospital}
        onChange={handelHospitaAbout}
      />
    </div>
  );
};

export default HospitalAbout;
