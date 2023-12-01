import React, { useState } from 'react';
import Layouts from '../../../components/Layouts';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import { toast } from 'react-toastify';
const SpecialityArea = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialityArea, setSpecialityArea] = useState({
    name: '',
  });

  const openPopUp = () => {
    setShowModal(true);
  };
  const handleCloseModel = () => {
    setShowModal(false);
  };

  const onchSpecialty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSpecialityArea({ ...specialityArea, [name]: value });
  };

  const handleSpeciSubmit = async (e) => {
    e.preventDefault();
    const collectData = { specialityArea: specialityArea };

    try {
      setIsSubmitting(true);
      let addApiUrl = SERVER_BASE_URL + '/api/v1/admin/addSpecialityArea';
      const res = await axios.post(addApiUrl, JSON.stringify(collectData), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
      });
      if (res.data.success) {
        setIsSubmitting(false);
        toast.success(res.data.message);
        setSpecialityArea({ name: '' });
      } else {
        console.log('Something went wrong');
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
                  <div class="card-header" bis_skin_checked="1">
                    <h3 class="card-title">Speciality Area</h3>
                    <div style={{ float: 'right' }}>
                      <button className="btn btn-info" onClick={openPopUp}>
                        Add Speciality Areas
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>Speciality Areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* {/ show speciality subcategoyr  /} */}
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
              <h5 className="modal-title">Add speciality area</h5>
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
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Speciality area:
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={specialityArea.name}
                      onChange={onchSpecialty}
                      required
                    />
                  </div>
                </form>
              </div>
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
      {/* {/ Book Appointment Modal  /} */}
    </Layouts>
  );
};

export default SpecialityArea;
