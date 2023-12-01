import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import { toast } from 'react-toastify';

const Speciality = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speciality, setSpeciality] = useState({
    speciality_area: '',
    name: '',
  });

  const [allSpeciality, setAllSpeciality] = useState([]);

  const getSpecialityAreas = async () => {
    try {
      const specAreaApiurl =
        SERVER_BASE_URL + '/api/v1/admin/getSpecialityAreas';
      const res = await axios.get(specAreaApiurl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        // console.log(res.data.data);
        setAllSpeciality(res.data.data);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpecialityAreas();
    // console.log('all speciality', allSpeciality);
  }, []);

  const openPopUp = () => {
    setShowModal(true);
  };

  const handleCloseModel = () => {
    setShowModal(false);
  };

  const onchSpecialty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSpeciality({ ...speciality, [name]: value });
  };

  const handleSpeciSubmit = async (e) => {
    e.preventDefault();
    const collectData = { speciality: speciality };
    try {
      const specialityAddApiurl =
        SERVER_BASE_URL + '/api/v1/admin/SpecialityAdd';

      res = await axios.post(specialityAddApiurl, JSON.stringify(collectData), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
      });

      if (res.data.success) {
        toast.success('Speciality added successfully');
        setSpeciality({
          speciality_area: '',
          name: '',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card  card-primary">
                  <div className="card-header" bis_skin_checked="1">
                    <h3 className="card-title">Manage Specialities</h3>
                    <div style={{ float: 'right' }}>
                      <button className="btn btn-info" onClick={openPopUp}>
                        Add Speciality
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>Manage Specialities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Show speciality subcategory */}
      <div
        className={`modal ${showModal ? 'show fade' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: showModal ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add speciality</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Speciality Area:
                  </label>
                  <select
                    className="form-control"
                    name="speciality_area"
                    onChange={onchSpecialty}
                    value={speciality.speciality_area}
                  >
                    <option value="">Select Speciality Area</option>
                    {allSpeciality.map((Speciality, i) => (
                      <option key={i} value={Speciality._id}>
                        {Speciality.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Speciality:
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="speciality"
                    value={speciality.name}
                    onChange={onchSpecialty}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseModel}
              >
                Close
              </button>
              <SubmitButton
                onClick={handleSpeciSubmit}
                isSubmitting={isSubmitting}
                buttonText="Save"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Book Appointment Modal */}
    </Layouts>
  );
};

export default Speciality;
