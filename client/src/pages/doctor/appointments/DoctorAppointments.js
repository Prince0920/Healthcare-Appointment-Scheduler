import React, { useEffect, useState } from 'react';
import Layouts from '../../../components/Layouts';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import Moment from 'react-moment';
import SubmitButton from '../../../components/buttons/SubmitButton';
import { toast } from 'react-toastify';

const DoctorAppointments = () => {
  const [docAppointments, setDocAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalAppInfo, setShowModalAppInfo] = useState(false);
  const [selectedAppoId, setSelectedAppoId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appoUpdateStInfo, setAppoUpdateStInfo] = useState({
    status: '',
    comment: '',
  });
  const [currAppInfo, setCurrAppInfo] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const loadDoctorAppointments = async () => {
    console.log(filterStatus);
    try {
      let fetchApiUrl =
        SERVER_BASE_URL +
        '/api/v1/doctor/doctorAppointments?filterStatus=' +
        filterStatus +
        '';
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
  }, [docAppointments, filterStatus]); // Adding docAppointments as a dependency

  useEffect(() => {
    // Load doctor appointments on component mount
    loadDoctorAppointments();
  }, [filterStatus]); // Empty dependency array to run only once on mount

  const handleAppointmentStatus = (docAppointment) => {
    setAppoUpdateStInfo({
      status: '',
      comment: '',
    });
    setShowModal(true);
    const getSelectedAppoId = docAppointment._id;
    setSelectedAppoId(getSelectedAppoId);
    setAppoUpdateStInfo({
      status: docAppointment.status,
      comment: docAppointment.message ? docAppointment.message : '',
      patientName: docAppointment.userId.fullname,
    });
  };

  const handelAppoStatusChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAppoUpdateStInfo({ ...appoUpdateStInfo, [name]: value });
  };

  const handleAppoSubmit = async (e) => {
    e.preventDefault();
    const colappUpdateData = {
      appoUpdateStInfo: appoUpdateStInfo,
      appoId: selectedAppoId,
    };

    try {
      setIsSubmitting(true);
      let ApiUrl = SERVER_BASE_URL + '/api/v1/doctor/docUpdateAppoStatus';
      const res = await axios.post(ApiUrl, JSON.stringify(colappUpdateData), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
      });

      if (res.data.success) {
        setIsSubmitting(false);
        toast.success(res.data.message);
        console.log(res.data.data);
        // setAppoUpdateStInfo({
        //   status: res.data.data.status,
        //   comment: res.data.data.message,
        // });
        loadDoctorAppointments();
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

  //show appointment info on popup
  const viewAppoInfo = (docAppointment) => {
    setCurrAppInfo(docAppointment);
    setShowModalAppInfo(true);
    console.log(currAppInfo);
  };

  const handleCloseAppInfoModel = () => {
    setShowModalAppInfo(false);
  };

  //filter by status
  const filterByStatus = (status) => {
    setFilterStatus(status);
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
                    <div style={{ float: 'right' }}>
                      <div class="dropdown">
                        <a
                          class="btn btn-secondary dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Filter by status
                        </a>

                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <a
                            class="dropdown-item"
                            onClick={() => filterByStatus('scheduled')}
                          >
                            Scheduled
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() => filterByStatus('approved')}
                          >
                            Approved
                          </a>
                          <a
                            class="dropdown-item"
                            onClick={() => filterByStatus('rejected')}
                          >
                            Rejected
                          </a>
                        </div>
                      </div>
                    </div>
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
                          <th>App. Date/Time</th>
                          <th>Apply Date/Time</th>
                          <th>Status</th>
                          <th>Dr. Comment</th>
                          <th>View</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docAppointments.length > 0 ? (
                          docAppointments.map((docAppointment, i) => (
                            <tr key={i}>
                              <td scope="row">{i + 1}</td>
                              <td>
                                {docAppointment.userId.fullname
                                  ? docAppointment.userId.fullname
                                  : ''}
                              </td>
                              <td>
                                {docAppointment.userId
                                  ? docAppointment.userId.email
                                  : ''}
                              </td>
                              <td>
                                <Moment format="Do MMM, YYYY, h:mm: A">
                                  {docAppointment.appointmentDate}
                                </Moment>
                              </td>
                              <td>
                                <Moment format="Do MMM, YYYY, h:mm: A">
                                  {docAppointment.date}
                                </Moment>
                              </td>
                              <td
                                style={{
                                  color:
                                    docAppointment.status == 'approved'
                                      ? 'green'
                                      : docAppointment.status == 'rejected'
                                      ? 'red'
                                      : '#9f5848',
                                }}
                              >
                                {docAppointment.status.charAt(0).toUpperCase() +
                                  docAppointment.status.slice(1)}
                              </td>
                              <td>{docAppointment.message}</td>
                              <td>
                                <button
                                  onClick={() => viewAppoInfo(docAppointment)}
                                >
                                  <i class="fa fa-eye" aria-hidden="true"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    handleAppointmentStatus(docAppointment)
                                  }
                                >
                                  Update
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
                          <th>Appt. Date/Time</th>
                          <th>Apply Date/Time</th>
                          <th>Status</th>
                          <th>Dr.Comment</th>
                          <th>View</th>
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
              <h5 className="modal-title">
                Appointment For {appoUpdateStInfo.patientName}
              </h5>
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
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
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

      {/* {/ show Appointment info  /} */}
      <div
        className={`modal ${showModalAppInfo ? 'show fade' : ''}`}
        tabIndex="-1"
        role="dialog"
        style={{
          display: showModalAppInfo ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Patient appointment Info</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseAppInfoModel}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                <div class="modal-body">
                  <p>
                    Patient Name:{'   '}
                    <b>
                      {currAppInfo?.patientDetailId?.patientName
                        .charAt(0)
                        .toUpperCase() +
                        currAppInfo?.patientDetailId?.patientName.slice(1)}
                    </b>
                  </p>
                  <hr></hr>
                  <p>
                    Gender:{' '}
                    <b>
                      {currAppInfo?.patientDetailId?.gender
                        .charAt(0)
                        .toUpperCase() +
                        currAppInfo?.patientDetailId?.gender.slice(1)}
                    </b>
                  </p>
                  <hr></hr>
                  <p>
                    Age: <b>{currAppInfo?.patientDetailId?.age}</b>
                  </p>
                  <hr></hr>
                  <p>
                    Appo. Date:{' '}
                    <b>
                      {' '}
                      <Moment format="Do MMM, YYYY, h:mm: A">
                        {currAppInfo?.appointmentDate}
                      </Moment>
                    </b>
                  </p>
                  <p>Patient comments: {currAppInfo?.reasonOfAppointment}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseAppInfoModel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {/ show appointment Modal  /} */}
    </Layouts>
  );
};

export default DoctorAppointments;
