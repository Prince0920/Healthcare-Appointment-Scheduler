import { FilePdfOutlined } from '@ant-design/icons';
import { Modal, Popconfirm, Rate, Space, Table } from 'antd';
import moment from 'moment'; // Import moment library
import React, { useEffect, useState } from 'react';
import ContentHeader from '../../../components/ContentHeader';
import Layouts from '../../../components/Layouts';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';

const DoctorList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rating, setRating] = useState(0); // Initial rating
  const [feedback, setFeedback] = useState('');

  const [doctorData, setDoctorData] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const getCompletedAppointments = data => {
    return data.filter(e => e.status == 'completed');
  };

  const getAllBookings = async () => {
    setIsLoading(true);
    axios
      .get(SERVER_BASE_URL + '/api/v1/my-bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(bookings_data => {
        setDoctorData(getCompletedAppointments(bookings_data.data.data));
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllBookings();
  }, []);
  const showModal = doctor => {
    setFeedback(doctor?.review?.feedback || '');
    setSelectedDoctor(doctor);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      // console.log('Doctor:', selectedDoctor);
      // console.log('Rating:', rating);
      // console.log('Feedback:', feedback);
      const reviewBody = {
        appointmentId: selectedDoctor._id,
        rating: rating,
        feedback: feedback,
      };
      // api/v1/reviewByPatient
      const reviewData = await axios.post(SERVER_BASE_URL + '/api/v1/reviewByPatient', reviewBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Review success.');
      setIsModalVisible(false);
    } catch (error) {
      console.log('Error::::::::', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRatingChange = value => {
    setRating(value);
  };

  const handleFeedbackChange = e => {
    setFeedback(e.target.value);
  };

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctorFullName',
      key: 'doctorFullName',
    },
    {
      title: 'Appointment Date',
      key: 'appointmentDate',
      render: (text, record) => moment(record.appointmentDate).format('YYYY-MM-DD'), // Format the date
    },
    {
      title: 'Upload Reports',
      key: 'reports',
      render: (text, record) => {
        return (
          <Space>
            {record?.medicalReport ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={record?.medicalReport}
                  target='_blank'>
                  <FilePdfOutlined
                    style={{
                      fontSize: '25px',
                      color: '#ff0000',
                      marginRight: '10%',
                      cursor: 'pointer',
                    }}
                  />
                </a>
              </div>
            ) : (
              <>No Data</>
            )}
          </Space>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Popconfirm
            title='Are you sure you want to cancel?'
            // onConfirm={() => handleCancelAppointment(record._id)}
            okText='Yes'
            cancelText='No'
            disabled={record.status !== 'scheduled'} // Disable the Popconfirm based on condition
          >
            <button
              className='btn btn-success btn-block'
              style={{ background: '#4CAF50', color: 'white' }}
              onClick={() => {
                showModal(record);
              }}>
              Leave a Review
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Doctor List'
          bredCumName='Doctor List'
        />
        <section className='content'>
          <div className='container-fluid'>
            {loading ? (
              <Spinner />
            ) : (
              <Table
                dataSource={doctorData}
                columns={columns}
                pagination={false}
              />
            )}
            <Modal
              title={`Leave a Review for ${selectedDoctor ? selectedDoctor.doctorFullName : ''}`}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Rating:</label>
                  <Rate
                    allowHalf
                    defaultValue={selectedDoctor?.review?.rating || 0}
                    onChange={handleRatingChange}
                  />
                </div>

                <div style={{ marginBottom: '16px', width: '100%' }}>
                  <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Feedback:</label>
                  <textarea
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '8px' }}
                    rows='3'
                    value={feedback}
                    onChange={handleFeedbackChange}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default DoctorList;
