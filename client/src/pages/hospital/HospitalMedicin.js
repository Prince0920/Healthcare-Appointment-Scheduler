import React from "react";

const HospitalMedicin = ({ medicin, handleCheckboxChange }) => {
  return (
    <div className="form-group">
      <label style={{ marginBottom: "10px", display: "block" }}>
        System of Medicine Offered
      </label>
      <div>
        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.allopathy"
            checked={medicin.allopathy}
            onChange={handleCheckboxChange("allopathy")}
          />
          <span style={{ marginLeft: "5px" }}>Allopathy</span>
        </label>

        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.homeopathy"
            onChange={handleCheckboxChange}
          />
          <span style={{ marginLeft: "5px" }}>Homeopathy</span>
        </label>
        {/*
        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.ayurveda"
            onChange={handleCheckboxChange("ayurveda")}
          />
          <span style={{ marginLeft: "5px" }}>Ayurveda</span>
        </label>

        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.dental"
            onChange={handleCheckboxChange("dental")}
          />
          <span style={{ marginLeft: "5px" }}>Dental</span>
        </label>

        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.yogaAndNaturopathy"
            onChange={handleCheckboxChange("yogaAndNaturopathy")}
          />
          <span style={{ marginLeft: "5px" }}>Yoga & Naturopathy</span>
        </label>

        <label className="checkbox-inline" style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            name="medicin.unani"
            onChange={handleCheckboxChange("unani")}
          />
          <span style={{ marginLeft: "5px" }}>Unani</span>
        </label>*/}
      </div>
    </div>
  );
};

export default HospitalMedicin;
