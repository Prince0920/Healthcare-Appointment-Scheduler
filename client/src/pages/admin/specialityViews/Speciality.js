import React, { useState } from 'react';
import Layouts from '../../../components/Layouts';
import SubmitButton from '../../../components/buttons/SubmitButton';
const Speciality = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speciality, setSpeciality] = useState({
    speciality_type: '',
    speciality: '',
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
    setSpeciality({ ...speciality, [name]: value });
  };

  const handleSpeciSubmit = (e) => {
    e.preventDefault();
    alert();
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
                    <h3 class="card-title">Manage Specialities</h3>
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
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Speciality Area:
                    </label>

                    <select
                      className="form-control"
                      name="status"
                      onChange={onchSpecialty}
                      value={speciality.speciality_type}
                    >
                      <option value="">Select Speciality Area</option>
                      <option value="approved">Nerologist</option>
                      <option value="rejected">Pedriotic</option>
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
                      value={speciality.speciality}
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

export default Speciality;
