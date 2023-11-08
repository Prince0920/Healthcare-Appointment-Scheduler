import React, { useEffect, useState } from "react";
import Layouts from "../../components/Layouts";
import HospitalPrimaryinfo from "./HospitalPrimaryInfo";
import axios from "axios";
import { SERVER_BASE_URL } from "../../config/config.local";
import HospotalAddressInfo from "./HospitalAddressInfo";
import HospitalAbout from "./HospitalAbout";
import HospitalMedicin from "./HospitalMedicin";
import HospitalHmresource from "./HospitalHmresource";
import HospitalInfrastructure from "./HospitalInfrastructure";

const HospitalProfile = () => {
  const [hospitalData, setHospitalData] = useState({
    establishmentDetails: {
      hospitalName: "",
      ownerName: "",
    },
    address: {
      addressLineOne: "",
      village: "",
      district: "",
      state: "",
      pincode: "",
      telephoneNumber: "",
      mobileNumber: "",
      email: "",
      website: "",
    },
    aboutHospital: "",
    systemOfMedicine: {
      allopathy: false,
      homeopathy: false,
      ayurveda: false,
      dental: false,
      yogaAndNaturopathy: false,
      unani: false,
    },
    specialty: {
      medicalSurgical: false,
      pediatrics: false,
    },
    humanResources: {
      totalEmployees: "",
      totalDoctors: "",
    },
    infrastructureDetails: {
      totalArea: "",
      constructedArea: "",
    },
  });

  const [establishmentDetails, setEstablishmentDetails] = useState({
    hospitalName: "",
    ownerName: "",
  });

  const [address, setAddress] = useState({
    addressLineOne: "",
    village: "",
    district: "",
    state: "",
    pincode: "",
    telephoneNumber: "",
    mobileNumber: "",
    email: "",
    website: "",
  });

  const [about, setAbout] = useState({ aboutHospital: "" });
  const [humanRecource, setHumanRecource] = useState({
    totalEmployees: "",
    totalDoctors: "",
  });

  const [medicin, setMedicin] = useState({
    allopathy: false,
    homeopathy: false,
    ayurveda: false,
    dental: false,
    yogaAndNaturopathy: false,
    unani: false,
  });

  const [infrastructureDetails, setInfrastructureDetails] = useState({
    totalArea: "",
    constructedArea: "",
  });

  const handlePrimaryInfoChange = (e) => {
    const { name, value } = e.target;
    setEstablishmentDetails({
      ...establishmentDetails,
      [name]: value,
    });
    console.log(value);
  };

  const handleInputAddress = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
    console.log(value);
  };

  const handelHospitaAbout = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
    console.log(value);
  };

  const handelHumanResChange = (e) => {
    const { name, value } = e.target;

    setHumanRecource({
      ...humanRecource,
      [name]: value,
    });
  };

  const handelInfrastructure = (e) => {
    const { name, value } = e.target;

    setInfrastructureDetails({
      ...infrastructureDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalProfileData = {
      establishmentDetails: establishmentDetails,
      address: address,
      about: about,
      humanResources: humanRecource,
      infrastructureDetails: infrastructureDetails,
    };

    console.log(hospitalProfileData);

    try {
      const res = await axios.post(
        SERVER_BASE_URL + "/api/v1/hospital/hospitalUpdateProfile",
        JSON.stringify(hospitalProfileData),
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    console.log("Yes submitted");
  };

  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card  card-primary">
                  <div class="card-header" bis_skin_checked="1">
                    <h3 class="card-title">Hospital Profile</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      {/* Establishment Details */}
                      <HospitalPrimaryinfo
                        establishmentDetails={establishmentDetails}
                        handlePrimaryInfoChange={handlePrimaryInfoChange}
                      />

                      {/* Address */}
                      <h4>Address:-</h4>
                      <HospotalAddressInfo
                        address={address}
                        handleInputAddress={handleInputAddress}
                      />

                      {/* About the Hospital */}
                      <HospitalAbout
                        about={about}
                        handelHospitaAbout={handelHospitaAbout}
                      />

                      {/* System of Medicine */}
                      {/* <HospitalMedicin
                        medicin={medicin}
                        handleCheckboxChange={handleCheckboxChange}
                      /> */}

                      {/* Specialty */}
                      {/* <div className="form-group">
                      
                        <label>Specialty</label>
                        <div>
                          <label
                            className="checkbox-inline"
                            style={{ marginRight: "10px" }}
                          >
                            <input
                              type="checkbox"
                              name="specialty.medicalSurgical"
                              checked={hospitalData.specialty.medicalSurgical}
                              onChange={handleInputChange}
                            />

                            <span style={{ marginLeft: "5px" }}>
                              Medical Surgical
                            </span>
                          </label>

                          <label className="checkbox-inline">
                            <input
                              type="checkbox"
                              name="specialty.pediatrics"
                              checked={hospitalData.specialty.pediatrics}
                              onChange={handleInputChange}
                            />
                            <span style={{ marginLeft: "5px" }}>
                              Pediatrics
                            </span>
                          </label>
                        </div>
                      </div> */}

                      {/* Human Resources */}
                      <HospitalHmresource
                        humanRecource={humanRecource}
                        handelHumanResChange={handelHumanResChange}
                      />

                      {/* Infrastructure Details */}
                      <HospitalInfrastructure
                        infrastructureDetails={infrastructureDetails}
                        handelInfrastructure={handelInfrastructure}
                      />

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary">
                        Update Hospital
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default HospitalProfile;
