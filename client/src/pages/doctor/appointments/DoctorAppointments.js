import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import Moment from 'react-moment';
import SubmitButton from '../../../components/buttons/SubmitButton';

const DoctorAppointments = () => {
  const [docAppointments, setDocAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppoId, setSelectedAppoId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appoUpdateStInfo, setAppoUpdateStInfo] = useState({
    status: '',
    comment: '',
  });

  const loadDoctorAppointments = async () => {
    try {
      let fetchApiUrl = SERVER_BASE_URL + '/api/v1/doctor/doctorAppointments';
      const res = await axios.get(fetchApiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        //console.log(res.data.data);
        setDocAppointments(res.data.data);
        //console.log('record length', docAppointments.length);
      } else {
        console.log('test  something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // This will be called whenever docAppointments is updated
    // console.log('record length', docAppointments.length);
  }, [docAppointments]); // Adding docAppointments as a dependency

  useEffect(() => {
    // Load doctor appointments on component mount
    loadDoctorAppointments();
  }, []); // Empty dependency array to run only once on mount

  const handleAppointmentStatus = (docAppointment) => {
    setShowModal(true);
    console.log('appointment data for model', docAppointment);
    const getSelectedAppoId = docAppointment._id;
    console.log('Selected appointment id', getSelectedAppoId);
    setSelectedAppoId(getSelectedAppoId);
  };

  const handelAppoStatusChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAppoUpdateStInfo({ ...appoUpdateStInfo, [name]: value });
  };

  const handleAppoSubmit = async (e) => {
    e.preventDefault();
    //console.log('Yes click for form submit');
    const colappUpdateData = { appoUpdateStInfo: appoUpdateStInfo };

    try {
      setIsSubmitting(true);
      let ApiUrl = SERVER_BASE_URL + '/api/v1/doctor/docUpdateAppoStatus';
      const res = await axios.post(ApiUrl, JSON.stringify(colappUpdateData), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        console.log(res.data.data);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseBookAppointmentModel = () => {
    setShowModal(false);
  };

  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Appointments</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Appointments</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">All Appointments</h3>
                  </div>
                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docAppointments.length > 0 ? (
                          docAppointments.map((docAppointment, i) => (
                            <tr key={i}>
                              <td scope="row">{i + 1}</td>
                              <td>{docAppointment.patientInfo.fullname}</td>
                              <td>{docAppointment.patientInfo.email}</td>
                              <td>
                                <Moment format="Do MMM, YYYY, h:mm: A">
                                  {docAppointment.date}
                                </Moment>
                              </td>
                              <td>
                                {docAppointment.patientInfo.status
                                  .charAt(0)
                                  .toUpperCase() +
                                  docAppointment.patientInfo.status.slice(1)}
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    handleAppointmentStatus(docAppointment)
                                  }
                                >
                                  Update Status
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5}>
                              <center>No, Records available!</center>
                            </td>
                          </tr>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Time</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* {/ show Appointment status Modal  /} */}
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
              <h5 className="modal-title">Appointment For </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseBookAppointmentModel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Appointment Status:
                    </label>

                    <select
                      className="form-control"
                      name="status"
                      onChange={handelAppoStatusChange}
                      value={appoUpdateStInfo.status}
                    >
                      <option value="">Select Status</option>
                      <option value="Approve">Approve</option>
                      <option value="Reject">Reject</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message-text" className="col-form-label">
                      Add Comment:
                    </label>
                    <textarea
                      className="form-control"
                      name="comment"
                      id="message-text"
                      onChange={handelAppoStatusChange}
                      value={appoUpdateStInfo.comment}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseBookAppointmentModel}
              >
                Close
              </button>
              {/* <button
                className="btn btn-success"
                style={{ background: '#4CAF50', color: 'white' }}
                // onClick={() => {
                //   handleBookAppointment(selectedProvider, appointmentData);

                // }}
              >
                Save
              </button> */}
              <SubmitButton
                onClick={handleAppoSubmit}
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

export default DoctorAppointments;
